import { Outlet } from "react-router-dom";
import AppNav from "../appnav/AppNav";
import Logo from "../logo/Logo";
import styles from "./Sidebar.module.css";

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <Outlet />
      <footer className={styles.footer}>
        <p className={styles.copyright}>
          &copy; Copyright {2023} by Zinaida Jusufovic
        </p>
      </footer>
    </div>
  );
}

export default Sidebar;
