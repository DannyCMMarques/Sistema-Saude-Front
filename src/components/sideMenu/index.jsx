import styles from "./styles.module.css";
import { useEffect, useState, useContext } from "react";
import {
  BriefcaseMedical,
  Home,
  UserRoundSearch,
  FilePen,
  LogOut,
} from "lucide-react";
import MenuContents from "../../contents/menuContents";
import { ThemeContext } from "../../context/ThemeContext";
const SideMenu = () => {
  const { isOpen, toggle, setIsOpen, setToggle } = useContext(ThemeContext);

  const menuCardContent = MenuContents({
    home: <Home />,
    paciente: <UserRoundSearch />,
    consulta: <BriefcaseMedical />,
    receituarios: <FilePen />,
    sair: <LogOut />,
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 760) {
        setIsOpen(true);
        setToggle(true);
      } else {
        setIsOpen(false);
        setToggle(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSideMenu = () => {
    if (window.innerWidth > 760) {
      setIsOpen(!isOpen);
    }
  };

  const handleNavegar = (href) => {
    if (href !== "/sair") {
      window.location.href = href;
    } else {
      localStorage.removeItem("access_token");
      window.location.href = "/";
    }
  };

  return (
    <div className={styles.containerAll}>
      <div
        className={`${styles.containerSide} ${
          isOpen ? styles.containerSideMobile : ""
        }`}
      >
        <div
          style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          onClick={() => (!toggle ? toggleSideMenu() : "")}
        >
          <div
            className={`${
              !isOpen ? styles.containerLogo : styles.containerLogoMobile
            }`}
          >
            <img
              className={isOpen ? styles.marca : styles.marca2}
              src="./../../../logoHeal.png"
              alt="Icon"
            />
          </div>
          {!isOpen && <p className={styles.LogoTitle}>MEDICALPLUS</p>}
        </div>
        <ul>
          {menuCardContent.map((item) => (
            <li className={styles.itemLi} key={item.id}>
              <a
                onClick={() => handleNavegar(item.href)}
                className={styles.linkTabela}
              >
                <div className={styles.icon}>{item.icones}</div>
                {!isOpen && <h5>{item.titulo}</h5>}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SideMenu;
