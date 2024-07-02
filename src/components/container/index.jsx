import React, { useContext, useEffect, useState } from "react";
import styles from "./styles.module.css";
import { ThemeContext } from "../../context/ThemeContext";

const ContainerMaster = ({ children }) => {
  const { isOpen } = useContext(ThemeContext);
  const [containerStyle, setContainerStyle] = useState({
    width: "calc(100% - 280px)",
    left: "280px",
  });

  useEffect(() => {
    const calculateStyle = () => {
      const sideMenuWidth = isOpen ? 100 : 380;
      const contentWidth = window.innerWidth - sideMenuWidth;
      const leftOffset = (window.innerWidth - contentWidth) / 4;
      setContainerStyle({
        width: `calc(100% - ${sideMenuWidth}px)`,
        left: `${leftOffset}px`,
      });
    };

    calculateStyle();
  }, [isOpen]);

  return (
    <div className={styles.containerMaster} style={containerStyle}>
      {children}
    </div>
  );
};

export default ContainerMaster;
