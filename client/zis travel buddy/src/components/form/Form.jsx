import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "../button/Button";
import { useNavigate } from "react-router-dom";
import { useUrlPosition } from "../../hooks/useUrlPosition";
import Message from "../message/Message";
import Spinner from "../spinner/Spinner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCities } from "../../context/CitiesContext";

/*"https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0");*/
const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const { createCity, isLoading } = useCities();
  const [lat, lng] = useUrlPosition();
  const navigate = useNavigate();

  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [emoji, setEmoji] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [geoCodingError, setGeoCodingError] = useState("");

  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);

  useEffect(() => {
    async function fetchCityData() {
      try {
        setIsLoadingGeocoding(true);
        setGeoCodingError("");
        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
        const data = await res.json();
        if (!data.countryCode) {
          throw new Error(
            "This are is not registered, click somewhere else :)"
          );
        }
        setCityName(data.city || data.locality || "");
        setCountry(data.countryName || "");
        setEmoji(convertToEmoji(data.countryCode));
      } catch (error) {
        setGeoCodingError(error.message);
      } finally {
        setIsLoadingGeocoding(false);
      }
    }
    fetchCityData();
  }, [lat, lng]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!cityName || !date) return;
    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
    };
    await createCity(newCity);
    navigate("/app/cities");
  }

  if (isLoadingGeocoding) return <Spinner />;
  if (!lat && !lng) return <Message message={"To start click on Map"} />;

  if (geoCodingError) return <Message message={geoCodingError} />;

  return (
    <form
      className={`${styles.form} ${isLoading ? styles["loading"] : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        {/* <span className={styles.flag}>{emoji}</span> */}
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>

        <DatePicker
          id="date"
          dateFormat="dd/MM/yyyy"
          selected={date}
          onChange={(date) => setDate(date)}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type={"primary"}>Add</Button>
        <Button
          type={"back"}
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          &larr; Back
        </Button>
      </div>
    </form>
  );
}

export default Form;
