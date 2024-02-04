import React, { useContext } from 'react';
import ThemeContext from '../context/ThemeContext';

const Card = ({ children }) => {   /*take a children prop to use directly in output*/
    const { darkMode } = useContext(ThemeContext);
    return (
        <div className={
            `w-full h-full rounded-md relative p-8 border-2 
            ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-neutral-200"}`
        }>
            {children}
        </div>
    );
};

export default Card;