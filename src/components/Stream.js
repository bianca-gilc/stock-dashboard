import React, { useEffect, useState } from 'react';
import StreamComponent from './StreamComponent';
import { getMarketStatus } from '../api/stock-api';
import { Tooltip } from 'react-tooltip'


const Stream = () => {

    const [btcPrice, setBtcPrice] = useState(0); //const [crypOnePrice, setCrypOnePrice] = useState(0);
    const [icPrice, setIcPrice] = useState(0); //const [crypTwoPrice, setCrypTwoPrice] = useState(0);
    const [googPrice, setGoogPrice] = useState(0);
    const [tslaPrice, setTslaPrice] = useState(0);
    const [amznPrice, setAmznPrice] = useState(0);

    const [marketStatus, setMarketStatus] = useState(false);

    useEffect(() => {
        const updateMarketStatus = async () => {
            console.log("updating market status");
            try {
                const result = await getMarketStatus();
                setMarketStatus(result["isOpen"]);
            }
            catch(error) {
                setMarketStatus(false);
                console.log(error, "failed to update market status");
            }
        };
        updateMarketStatus();

        const socket = new WebSocket('wss://ws.finnhub.io?token=clqhcrhr01qjl4hptqm0clqhcrhr01qjl4hptqmg');
        const cryptoList = ['BINANCE:BTCUSDT', 'BINANCE:LTCUSDT']
        const cryptoAndStockList = ['BINANCE:BTCUSDT', 'BINANCE:LTCUSDT', "GOOG", "TSLA", "AMZN"];

        socket.onopen = function open() {
            console.log("socket open, market is open: ", marketStatus);
            if (marketStatus) { 
                console.log("SUBSCRIBING TO CRYPTO AND STOCKS");
                cryptoAndStockList.forEach((symbol) => {
                    socket.send(JSON.stringify({'type':'subscribe', 'symbol': symbol}));
                })
            } else {
                console.log("SUBSCRIBING TO ONLY CRYPTO");
                cryptoList.forEach((symbol) => {
                    socket.send(JSON.stringify({'type':'subscribe', 'symbol': symbol}));
                })
            }       
        };

        socket.onerror = function error() {
            console.log("Websocket error");
        };

        socket.onclose = function close() {
            console.log("disconnected");
        };

        socket.onmessage = function incoming(message) {
            try {
                const response = JSON.parse(message.data);
                switch(response.type) {
                    case 'ping':
                        console.log('Ping from server');
                        break;
                    case 'trade':
                        if (response.data[0].s === 'BINANCE:BTCUSDT') {
                            //console.log("got btc");
                            setBtcPrice(response.data[0].p.toFixed(2));
                        }
                        if (response.data[0].s === 'BINANCE:LTCUSDT') {
                            //console.log("got ic", response.data[0].p);
                            setIcPrice(response.data[0].p.toFixed(2));
                        }
                        if (response.data[0].s === 'GOOG') {
                            setGoogPrice(response.data[0].p.toFixed(2));
                        }
                        if (response.data[0].s === 'TSLA') {
                            setTslaPrice(response.data[0].p.toFixed(2));
                        }
                        if (response.data[0].s === 'AMZN') {
                            setAmznPrice(response.data[0].p.toFixed(2));
                        }
                        //console.log('Message from server ', response.data[0].s, response.data[0].p);
                        break;                  
                    default:
                        console.log('Unknown response type ', response);
                }
            } catch(error) {
                console.log("Unknown error", message);
            } 
        }
    }, [marketStatus]); //only runs once
    

    return (
        <>
            <div className='h-16 flex justify-evenly items-center text-lg xl:text-xl 2xl:text-2xl'>      
                <span><StreamComponent symbol='BINANCE:BTCUSDT' currentPrice={btcPrice} /></span>
                <span><StreamComponent symbol='BINANCE:LTCUSDT' currentPrice={icPrice} /></span>
                
                { marketStatus ? <StreamComponent symbol="GOOG" currentPrice={googPrice} /> : <span className='anchor-ele'>GOOG</span> }
                { marketStatus ? <StreamComponent symbol="TSLA" currentPrice={tslaPrice} /> : <span className='anchor-ele'>TSLA</span> }
                { marketStatus ? <StreamComponent symbol="AMZN" currentPrice={amznPrice} /> : <span className='anchor-ele'>AMZN</span> }

                { <Tooltip anchorSelect='.anchor-ele' content="Market Closed! No Live Data" /> }
            </div>
        </>
    );
};

export default Stream;