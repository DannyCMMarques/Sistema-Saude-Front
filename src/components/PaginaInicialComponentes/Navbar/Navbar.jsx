import React, { useEffect, useState } from "react";
import { AlignJustify, X } from "lucide-react";
import styles from "./navbar.module.css";
import Botoes from "../../BotoesComponentes/Botoes";

const Navbar = ({ li1, li2, li3, li4 }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className={styles.Navbarhorizontal}>
      <div className={styles.navCont}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            className={styles.logoNavbar}
            src="./../../../logoHeal.png"
            alt="Logo"
          />
          <div className={styles.titleBrand}>
            <p>MEDICALPLUS</p>
          </div>
        </div>

        <div className={styles.menuIcon} onClick={toggleMenu}>
          {menuOpen ? <X size={24} /> : <AlignJustify size={24} />}
        </div>
      </div>
      {windowWidth >= 450 ? (
        <>
          <ul className={styles.paginasNavBar}>
            <li onClick={li1}>Quem somos</li>
            <li onClick={li2}>Funcionalidades</li>
            <li onClick={li3}>Receituários</li>
          </ul>
          <div className={styles.botoesLandingPage}>
            <div style={{ marginRight: 30 }}>
              <a href="/login">
                <Botoes background="azul" cor="branca">
                  Entrar
                </Botoes>
              </a>
            </div>

            <div>
              <a href="/cadastrar">
                <Botoes background="branco" cor="azul">
                  Cadastrar
                </Botoes>
              </a>
            </div>
          </div>
        </>
      ) : (
        menuOpen && (
          <div className={styles.mobileMenu}>
            <ul className={styles.paginasNavBar}>
              <li onClick={li1}>Quem somos</li>
              <li onClick={li2}>Funcionalidades</li>
              <li onClick={li3}>Clientes</li>
              <li onClick={li4}>Depoimentos</li>
            </ul>
            <div className={styles.botoesLandingPage}>
              <div style={{ marginBottom: 10 }}>
                <a href="/login">
                  <Botoes background="azul" cor="branca">
                    Entrar
                  </Botoes>
                </a>
              </div>

              <div>
                <a href="/cadastrar">
                  <Botoes background="branco" cor="azul">
                    Cadastrar
                  </Botoes>
                </a>
              </div>
            </div>
          </div>
        )
      )}
    </nav>
  );
};

export default Navbar;
