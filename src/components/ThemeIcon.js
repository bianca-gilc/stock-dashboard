import { MoonIcon } from '@heroicons/react/24/outline';
import React, { useContext } from 'react';
import ThemeContext from '../context/ThemeContext';

const ThemeIcon = () => { 
    const { darkMode, setDarkMode } = useContext(ThemeContext);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <button 
            className={
                `rounded-lg border-1 border-neutral-400 p-2 absolute right-8 xl:right-32 shadow-md 
                ${darkMode ? "shadow-gray-500" : null} transition duration-300 hover:scale-125
            `}
            onClick={toggleDarkMode}
        >
            <MoonIcon className={
                `"h-4 w-4 cursor-pointer stroke-1 fill-none stroke-neutral-400" 
                ${darkMode ? "fill-yellow-400 stroke-yellow-400" : null}`} 
            />
        </button>
    );
};

export default ThemeIcon;