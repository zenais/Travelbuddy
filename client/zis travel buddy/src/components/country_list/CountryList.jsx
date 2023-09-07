import CountryItem from "../country_item/CountryItem";
import Message from "../message/Message";
import Spinner from "../spinner/Spinner";
import PropTypes from "prop-types";
import styles from "./CountryList.module.css";
import { useCities } from "../../context/CitiesContext";

function CountryList() {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;
  if (cities.length < 1)
    return (
      <Message
        message={"Start your first adventure by clicking on a city on the map"}
      />
    );

  const countyList = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.city).includes(city.country))
      return [
        ...arr,
        { country: city.country, emoji: city.emoji, id: city.id },
      ];
  }, []);

  return (
    <ul className={styles.countryList}>
      {countyList.map((country) => (
        <CountryItem key={country.country} country={country} />
      ))}
    </ul>
  );
}
CountryList.propTypes = {
  cities: PropTypes.array,
  isLoading: PropTypes.bool,
};

export default CountryList;
