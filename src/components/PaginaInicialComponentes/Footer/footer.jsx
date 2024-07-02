import React from "react";
import styles from "./footer.module.css";
import { Github, GithubIcon, Facebook, Mail } from "lucide-react";
const Footer = () => {
  return (
    <div className={styles.containerFooter}>
      <div
        style={{
          display: "flex",
          gap: 5,
          alignItems: "center",
        }}
      >
        <h1 className={styles.logos}>
          <span style={{ fontSize: 30 }}>+</span> MEDICALPLUS
        </h1>
        <div>
          <p style={{ textAlign: "center", color: "white" }}>
            Siga nossas redes sociais:
          </p>
          <div style={{ display: "flex", gap: 5, marginTop: 10 }}>
            <Facebook size={24} color="white" />
            <GithubIcon size={24} color="white" />
            <Mail size={24} color="white" />
          </div>
        </div>
      </div>
      <p style={{ textAlign: "center", color: "white", marginTop: 30 }}>
        Todos direitos reservados a +MedicalPlus
      </p>
    </div>
  );
};

export default Footer;
