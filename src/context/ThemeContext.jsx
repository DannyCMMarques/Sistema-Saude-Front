import { createContext,useState } from "react";


export const ThemeContext = createContext()

export const ThemeProvider = ({children}) => {
    const [isOpen, setIsOpen] = useState(window.innerWidth < 760);
    const [toggle, setToggle] = useState(false);
  
    return(
       <ThemeContext.Provider value={{isOpen,toggle,setIsOpen,setToggle}}>{children}</ThemeContext.Provider>
   
    )

}