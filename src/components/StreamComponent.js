import React, { useEffect, useState } from 'react';
import { fetchQuote } from '../api/stock-api';


const StreamComponent = ({ symbol, currentPrice }) => {   /*take a symbol prop to use directly in output*/

    //const [prevPrice, setPrevPrice] = useState(0);
    const [change, setChange] = useState(0);
    const [btcPrevPrice, setbtcPrevPrice] = useState(0);
    const [icPrevPrice, setIcPrevPrice] = useState(0);
    const [googPrevPrice, setGoogPrevPrice] = useState(0);
    const [tslaPrevPrice, setTslaPrevPrice] = useState(0);
    const [amznPrevPrice, setAmznPrevPrice] = useState(0);

    useEffect(() => {
           // get previous closing prices to pass as props to StreamComponent
        const getPrevPrice = async (targetSymbol) => {
            //console.log("running getPrevPrice for", targetSymbol);
            try {
                const result = await fetchQuote(targetSymbol);
                //console.log("got result")
                switch(targetSymbol){
                    case 'BINANCE:BTCUSDT':
                        //console.log("get prev price case btc");
                        setbtcPrevPrice(result.pc);
                        break;
                    case 'BINANCE:LTCUSDT':
                        //console.log("get prev price case ic");
                        setIcPrevPrice(result.pc);
                        break;
                    case 'GOOG':
                        setGoogPrevPrice(result.pc);
                        break;
                    case 'TSLA':
                        setTslaPrevPrice(result.pc);
                        break;
                    case 'AMZN':
                        setAmznPrevPrice(result.pc);
                        break;
                    default:
                        console.log("didnt match");
                }
            }
            catch(error) {
                console.log(error, "got error fetching prev price for", targetSymbol);
            }
        };
        getPrevPrice('BINANCE:BTCUSDT');
        getPrevPrice('BINANCE:LTCUSDT');
        getPrevPrice('GOOG');
        getPrevPrice('TSLA');
        getPrevPrice('AMZN');
    },[]) //only run on first render

    useEffect(() => {
        const calculateChange = () => {
            switch(symbol) {
                case 'BINANCE:BTCUSDT':
                    setChange(
                        (100 * (currentPrice - btcPrevPrice) / btcPrevPrice).toFixed(2)
                    );
                    break;
                case 'BINANCE:LTCUSDT':
                    setChange(
                        ( 100 * (currentPrice - icPrevPrice) / icPrevPrice ).toFixed(2)
                    );
                    break;
                case 'GOOG':
                    setChange(
                        ( 100 * (currentPrice - googPrevPrice) / googPrevPrice ).toFixed(2)
                    );
                    break;
                case 'TSLA':
                    setChange(
                        ( 100 * (currentPrice - tslaPrevPrice) / tslaPrevPrice ).toFixed(2)
                    );
                    break;
                case 'AMZN':
                    setChange(
                        ( 100 * (currentPrice - amznPrevPrice) / amznPrevPrice ).toFixed(2)
                    );
                    break;
                default:
                    setChange(0);
            }
        };
        calculateChange();
    }) //runs every re-render

    return (
        <>
            <span className='flex justify-center'>
                    <span className='m-4 text-lg xl:text-xl 2xl:text-2xl hover:font-bold hover:font-serif'>{symbol}</span>
                    <span className='grid content-around'>
                        <div className='text-md'>
                            {currentPrice} USD
                        </div>
                        <span className={`text-md ${change > 0 ? "text-lime-500" : "text-red-500"}`}>
                            {change}%
                        </span>    
                    </span>
            </span>
        </>
    );
};

export default StreamComponent;