import React, { createContext, useContext, useState } from 'react';

const DiscomfortContext = createContext();

export const useDiscomforts = () => useContext(DiscomfortContext);

export const DiscomfortProvider = ({ children }) => {
    const [discomforts, setDiscomforts] = useState([
        {
            bodyPart: 'Neck',
            whenPain: 'Morning, Evening',
            motion: 'Turning head',
            followUp: 'Ice pack',
            painLevel: 5,
            date: new Date().toISOString(),
        },
        {
            bodyPart: 'Lower back',
            whenPain: 'Morning, Evening',
            motion: 'Bending over',
            followUp: 'Heating pad',
            painLevel: 7,
            date: new Date().toISOString(),
        },
    ]);

    return (
        <DiscomfortContext.Provider value={{ discomforts, setDiscomforts }}>
            {children}
        </DiscomfortContext.Provider>
    );
};