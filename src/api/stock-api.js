/*helpers for interacting with api */

import { convertDateToUnixTimeStamp } from "../helpers/date-helper";

const basePath = "https://finnhub.io/api/v1";

export const getMarketStatus = async () => {
    const url = `${basePath}/stock/market-status?exchange=US&token=${process.env.REACT_APP_API_KEY}`;
    const response = await fetch(url);

    if (!response.ok) {
        const message = `An error has occured getting market status: ${response.status}`
        throw new Error(message);
    }
    return await response.json(); 
};


export const searchSymbols = async (query) => {
    const url = `${basePath}/search?q=${query}&token=${process.env.REACT_APP_API_KEY}`;
    const response = await fetch(url);

    if (!response.ok) {
        const message = `An error has occured: ${response.status}`
        throw new Error(message);
    }
    return await response.json(); /*parse as json, a js object */
};


export const fetchStockDetails = async (stockSymbol) => {
    const url = `${basePath}/stock/profile2?symbol=${stockSymbol}&token=${process.env.REACT_APP_API_KEY}`;
    const response = await fetch(url);

    if (!response.ok) {
        const message = `An error has occured: ${response.status}`
        throw new Error(message);
    }
    return await response.json();
};


export const fetchQuote = async (stockSymbol) => {
    const url = `${basePath}/quote?symbol=${stockSymbol}&token=${process.env.REACT_APP_API_KEY}`;
    const response = await fetch(url);

    if (!response.ok) {
        const message = `An error has occured: ${response.status}`
        throw new Error(message);
    }
    return await response.json();
};


export const fetchHistoricalData = async (stockSymbol, resolution, from, to) => {
    const url = 
        `${basePath}/stock/candle?symbol=${stockSymbol}&resolution=${resolution}&from=${from}&to=${to}&token=${process.env.REACT_APP_API_KEY}`;
    const response = await fetch(url);

    if (!response.ok) {
        const message = `An error has occured: ${response.status}`
        throw new Error(message);
    }

    return await response.json();
};


export const fetchAggregateData = async (stockSymbol, timespan, from, to) => {

    const basePolygon = "https://api.polygon.io/v2";
    const tokenPolygon = "nnq9QWDIbujkdBYODpaCiNxiNWGP4Q9O";
    var multiplier = 1;
    const setInterval = () => {
        if (timespan === "day") {

            let prevDate = (new Date(Date.now() - 1000*60*60*24));
            prevDate = prevDate.toLocaleDateString('sv');
            prevDate = prevDate.split('-');
            prevDate = prevDate.map((x) => Number(x))

            from = convertDateToUnixTimeStamp(new Date(prevDate[0], prevDate[1]-1, prevDate[2], 9, 30));
            to = convertDateToUnixTimeStamp(new Date(prevDate[0], prevDate[1]-1, prevDate[2], 16));
            //console.log(from, to)
            multiplier = 5;
            return "minute"; 
        } else if (timespan === "week"){
            return "hour";
        } else {
            return "day";
        }
    };
    
    const interval = setInterval();
    const url = 
    `${basePolygon}/aggs/ticker/${stockSymbol}/range/${multiplier}/${interval}/${from}/${to}?adjusted=true&sort=asc&apiKey=${tokenPolygon}`;
    const response = await fetch(url);

    //console.log("used url: ", url);
    if (!response.ok) {
        const message = `An error has occured fetching aggregate data: ${response.status}`
        throw new Error(message);
    }

    return await response.json();
};