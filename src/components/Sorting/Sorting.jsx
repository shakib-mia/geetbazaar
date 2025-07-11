import React, { useState } from 'react';
import filter from "../../assets/icons/filter.svg"
// import { SongsContext } from '../../contexts/SongsContext';

const Sorting = ({ text, options, songs, handleSort }) => {
    const [checked, setChecked] = useState(false);
    const [label, setLabel] = useState(text);

    const handleSorting = (item) => {
        setLabel(item);
        handleSort(item)
        // console.log(item);
        songs.sort((song1, song2) => {
            const value1 = parseFloat(song1[item]);
            const value2 = parseFloat(song2[item]);

            // Handle cases where the values are strings
            if (isNaN(value1) || isNaN(value2)) {
                // If one of the values is not a valid number, compare them as strings
                return String(song1[item]).localeCompare(String(song2[item]));
            }

            // Compare the values as numbers
            return value1 - value2;
        })
    }

    return (
        <div className='relative z-[9999999]'>
            <label className="flex w-full justify-between items-center">
                <div className='p-1 flex gap-1'>
                    <img src={filter} alt='sorting' />
                    <p className='text-paragraph-1'>{label.split("_").join(' ')}</p>
                </div>

                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M5.52861 3.52861C5.78896 3.26826 6.21107 3.26826 6.47141 3.52861L10.4714 7.52861C10.7318 7.78896 10.7318 8.21107 10.4714 8.47141L6.47141 12.4714C6.21107 12.7318 5.78896 12.7318 5.52861 12.4714C5.26826 12.2111 5.26826 11.789 5.52861 11.5286L9.0572 8.00001L5.52861 4.47141C5.26826 4.21107 5.26826 3.78896 5.52861 3.52861Z" fill="#4B5563" />
                </svg>

                <input type="checkbox" name="" className='hidden' onChange={e => setChecked(e.target.checked)} />
                {checked && <div className='w-full bg-white rounded shadow-2xl p-1 flex flex-col absolute top-5 left-0 h-[220px] overflow-y-auto'>
                    {options.map(item => <div onClick={() => handleSorting(item)} className={`capitalize p-1 hover:bg-grey-light ${label === item ? 'bg-grey-light cursor-not-allowed' : ''}`} key={item}>{item.split("_").join(" ")}</div>)}
                </div>}
            </label>
        </div>
    );
};

export default Sorting;