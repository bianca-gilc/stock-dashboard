import React, { useContext } from 'react';
import StockContext from '../context/stockContext';
import ThemeContext from '../context/ThemeContext';


const SearchResults = ({ results }) => {  
    const { setStockSymbol } = useContext(StockContext);
    const { darkMode } = useContext(ThemeContext);
    return (
        <ul className={
                `absolute top-12 border-2 w-full rounded-md h-64 overflow-y-scroll custom-scrollbar
                ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-neutral-200"}`
            }>
            {results.map((item) => {
                return (
                    <li 
                        key={item.symbol} 
                        className={
                            `cursor-pointer p-4 m-2 flex items-center justify-between rounded-md hover:bg-indigo-200 transition duration-300
                            ${darkMode ? "hover:bg-indigo-500" : "hover:bg-indigo-200"}`
                        }
                        onClick={() => {setStockSymbol(item.symbol)}}
                    >
                        <span>{item.symbol}</span>
                        <span>{item.description}</span>
                    </li>
                );
            })}
        </ul>
    );
};

export default SearchResults;