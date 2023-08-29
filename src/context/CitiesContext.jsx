import { createContext, useState, useEffect, useContext } from 'react';

const BASE_URL = 'http://localhost:9000';

// 1. Create Context
const CitiesContext = createContext();

// 2. Create Provider Function
function CitiesProvider({ children }) {
  const [cities, setCities] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(function () {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch (err) {
        alert('There was an error loading data');
      } finally {
        setIsLoading(false);
      }
    }

    fetchCities();
  }, []);

  async function getCity(id) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch (err) {
      alert('There was an error loading data');
    } finally {
      setIsLoading(false);
    }
  }

  //3. Return the provder component for the context
  return (
    <CitiesContext.Provider value={{ cities, isLoading, currentCity, getCity }}>
      {children}
    </CitiesContext.Provider>
  );
}

// 4. Ctreate context consumer Hook
function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error('CitiesContext was used outside the CitiesProvider');
  return context;
}

export { CitiesProvider, useCities };
