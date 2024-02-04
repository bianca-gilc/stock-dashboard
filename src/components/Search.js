import React, { useState, useContext, useEffect } from 'react';
import { XMarkIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import SearchResults from './SearchResults';
import { searchSymbols } from '../api/stock-api';
import ThemeContext from '../context/ThemeContext';

const Search = () => {

    /*create states*/
    const [input, setInput] = useState("");
    const [bestMatches, setBestMatches] = useState([]);
    const { darkMode } = useContext(ThemeContext);

    /*helper functions*/ 

    const clear = () => {
        setInput("");
        setBestMatches([]);
    };

    const updateBestMatches = async () => {
        try {
            if (input) {
                const searchResults = await searchSymbols(input);
                const result = searchResults.result;
                setBestMatches(result);
            }
        }
        catch(error) {
            setBestMatches([]);
            console.log(error);
        }
    };

    return (
        <div className={`flex items-center my-4 border-2 rounded-md relative z-50 w-96 
        ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-neutral-200"}`}>
            <input 
                type="text" value={input} 
                className={`w-full px-4 py-2 focus:outline-none rounded-md ${darkMode ? "bg-gray-900" : null}`}
                placeholder="Search stock..."
                onChange={(event) => {setInput(event.target.value);}}   /*event.target is the element that triggered the event*/
                onKeyPress={(event) => {
                    if (event.key === "Enter") {
                        updateBestMatches();
                    }
                }}
            />
            
            { input && (
                <button onClick={clear} className="m-1">   
                    <XMarkIcon className="h-4 w-4 fill-gray-400" />
                </button>
                )
            }
            
            <button 
                onClick={updateBestMatches} 
                className="h-8 w-8 bg-indigo-200 rounded-md flex justify-center items-center m-1 p-2
                transition duration-300 hover:ring-2 ring-indigo-200"
                >   
                <MagnifyingGlassIcon className="h-4 w-4 fill-black" />
            </button>

            {input && bestMatches.length > 0 ? <SearchResults results={bestMatches} /> : null}

        </div>
    );
};

export default Search;