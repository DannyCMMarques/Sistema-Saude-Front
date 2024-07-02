import React, { createContext, useState } from "react";

export const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [filter, setFilter] = useState("");
  const [cancelar, setCancelar] = useState(true);

  return (
    <FilterContext.Provider
      value={{ filter, setFilter, setCancelar, cancelar }}
    >
      {children}
    </FilterContext.Provider>
  );
};
