import Link from "next/link";
import Image from "next/image";
import logo from "@public/icons/whatsapp.png";
import styles from "./styles.module.css";
const Nav = () => {
  return (
    <div className={styles.nav}>
        <div className={styles.navItem}>
          <Image src={logo} atl="my chat app" className={styles.logo} />
          <span className={styles.title}>I-chats</span>
        </div>
    </div>
  );
};

export default Nav;
