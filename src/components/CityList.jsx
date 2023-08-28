import CityItem from './CityItem';
import styles from './CityList.module.css';
import Spinner from './Spinner';
import Message from './Message';
// loaclhost:9000/cities
function CityList({ cities, isLoading }) {
  if (isLoading) return <Spinner />;

  if (cities.length === 0)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

export default CityList;
