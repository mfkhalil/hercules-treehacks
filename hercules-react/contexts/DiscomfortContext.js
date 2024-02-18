import React, { createContext, useContext, useState } from 'react';

const DiscomfortContext = createContext();

export const useDiscomforts = () => useContext(DiscomfortContext);

export const DiscomfortProvider = ({ children }) => {
  const [discomforts, setDiscomforts] = useState([
    // Your initial discomforts state
  ]);

  return (
    <DiscomfortContext.Provider value={{ discomforts, setDiscomforts }}>
      {children}
    </DiscomfortContext.Provider>
  );
};