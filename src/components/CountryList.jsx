import styles from './CountryList.module.css';
import Spinner from './Spinner';
import Message from './Message';
import CountryItem from './CountryItem';

function CountryList({ isLoading, cities }) {
  if (isLoading) return <Spinner />;

  if (cities.length === 0)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  const countries = cities.reduce((acc, cur) => {
    if (!acc.map((el) => el.country).includes(cur.country))
      return [...acc, { country: cur.country, emoji: cur.emoji }];
    else return acc;
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}

export default CountryList;
