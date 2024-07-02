import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../components/PaginaInicialComponentes/Navbar/Navbar";
import styles from "./styles.module.css";
import Sessao1 from "../../components/PaginaInicialComponentes/Sessao1Component/sessao1";
import Sessao2 from "../../components/PaginaInicialComponentes/sessao2/sessao2";
import Sessao3 from "../../components/PaginaInicialComponentes/sessao3/sessao3";
import Footer from "../../components/PaginaInicialComponentes/Footer/footer";
const PaginaPrincipal = () => {
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);
  const scrollToSection = (sectionRef) => {
    sectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <div>
        <Navbar
          li1={() => scrollToSection(section1Ref)}
          li2={() => scrollToSection(section2Ref)}
          li3={() => scrollToSection(section3Ref)}
        />
      </div>
      <div ref={section1Ref} className={styles.sessao1PagPrin}>
        <Sessao1 />
      </div>
      <div ref={section2Ref}>
        <Sessao2 />
      </div>
      <div className={styles.sessao3PagPrin} ref={section3Ref}>
        <Sessao3 />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default PaginaPrincipal;
