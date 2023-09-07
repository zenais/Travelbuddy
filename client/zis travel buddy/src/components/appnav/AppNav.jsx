import { NavLink } from "react-router-dom";
import styles from "./AppNav.module.css";
import PropTypes from "prop-types";

function AppNav(props) {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink to={"cities"}>Cities</NavLink>
        </li>
        <li>
          <NavLink to={"countries"}>Countries</NavLink>
        </li>
      </ul>
    </nav>
  );
}

AppNav.propTypes = {};

export default AppNav;
