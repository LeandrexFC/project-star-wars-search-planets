import { createContext, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

export const FetchContext = createContext();

function FetchProvider({ children }) {
  const [isLoading, setisLoading] = useState(false);
  const [apiError, setError] = useState(null);
  const [planets, setPlanets] = useState({ planet: [] });

  useEffect(() => {
    const fetchStarWarsApi = async () => {
      try {
        const request = await fetch('https://swapi.dev/api/planets');
        if (!request.ok) {
          const json = await request.json();
          throw json.message;
        }

        const returnApi = await request.json();

        const { results } = returnApi;
        setPlanets({
          ...planets,
          planet: results,
        });
      } catch (e) {
        setError(e);
      }
    };
    fetchStarWarsApi();
  }, []);

  const saveAllData = useMemo(() => ({
    setisLoading,
    isLoading,
    apiError,
    planets,
    setPlanets,
  }), [isLoading, apiError, planets, setPlanets]);

  return (
    <FetchContext.Provider
      value={ saveAllData }
    >
      { children }
    </FetchContext.Provider>
  );
}

FetchProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default FetchProvider;
