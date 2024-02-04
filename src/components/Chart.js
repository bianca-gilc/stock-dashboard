import React, { useState, useContext, useEffect } from 'react';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import Card from './Card';
import ChartFilter from './ChartFilter';
import { chartConfig, timeSpan } from '../constants/config';
import ThemeContext from '../context/ThemeContext';
/*real data */
import StockContext from '../context/stockContext';
import { convertDateToUnixTimeStamp, convertUnixTimeStampToDate, convertUnixTimeStampToTime, createDate } from '../helpers/date-helper';
import { fetchAggregateData } from '../api/stock-api';

const Chart = () => {   
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState("1W");

    const { darkMode } = useContext(ThemeContext);
    const { stockSymbol } = useContext(StockContext);

    const formatData = (toFormat) => {
        console.log(toFormat);
        return toFormat.map((item, index) => {
            return {
                value: Number(item.c.toFixed(2)),
                date: convertUnixTimeStampToDate(toFormat[index].t),
                time: convertUnixTimeStampToTime(toFormat[index].t),
                //dateAndTime: convertUnixTimeStampToDate(toFormat.t[index]) + convertUnixTimeStampToTime(toFormat.t[index])
            };
        });
    };

    useEffect(() => {
        const getDateRange = () => {
            const { days, weeks, months, years } = chartConfig[filter];
            const endDate = new Date();
            const startDate = createDate(endDate, -days, -weeks, -months, -years);

            const startTimestamp = convertDateToUnixTimeStamp(startDate);
            const endTimestamp = convertDateToUnixTimeStamp(endDate);  /*api requires unix timestamp */

            return { startTimestamp, endTimestamp };
        };

        const updateChartData = async () => {
            try {
                const { startTimestamp, endTimestamp } = getDateRange();
                const timespan = timeSpan[filter];
                console.log(`getting ${stockSymbol} data for a ${timespan}, 
                from ${startTimestamp} ${convertUnixTimeStampToDate(startTimestamp)} ${convertUnixTimeStampToTime(startTimestamp)} 
                to ${endTimestamp} ${convertUnixTimeStampToDate(endTimestamp)} ${convertUnixTimeStampToTime(endTimestamp)}`);
                const result = await fetchAggregateData(stockSymbol, timespan, startTimestamp, endTimestamp);
                setData(formatData(result['results']));
            }
            catch(error) {
                setData([]);
                console.log(error, "error updating chartData");
            }
        };
        updateChartData();
    }, [stockSymbol, filter]);

    return (
        <Card>
            <ul className="flex absolute top-2 right-2 z-40">
                {Object.keys(chartConfig).map((item) => {
                    return (
                        <li key={item}>
                            <ChartFilter text={item} active={filter === item} onClick={() => {setFilter(item)}}/>
                        </li>
                    )
                })}

            </ul>
            <ResponsiveContainer>
                <AreaChart data={data} margin={{top: 20, right: 30, left: 35, bottom: 50,}}>
                <defs>
                    <linearGradient id="chartColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                    </linearGradient>
                </defs>
                    <Area type="monotone" dataKey="value" stroke="#312e81" fillOpacity={1} strokeWidth={0.5} fill="url(#chartColor)"/>
                    <Tooltip 
                        contentStyle={darkMode ? {backgroundColor: "#111827"} : null}
                        itemStyle={darkMode ? {color: "#818cf8"} : null}
                    />
                    <XAxis dataKey={filter === "1D" ? "time" : "date"} />
                    <YAxis domain={["dataMin", "dataMax"]} />
                </AreaChart>
            </ResponsiveContainer>
        </Card>
    );
};
// setting margin to the chart fixes the problem of overflow
// when there are large numbers of data
export default Chart;