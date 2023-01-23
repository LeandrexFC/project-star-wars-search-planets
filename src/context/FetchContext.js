import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const FetchContext = createContext();

function FetchProvider({ children }) {
  const [isLoading, setisLoading] = useState(false);
  const [resultsApi, setResults] = useState([]);
  const [apiError, setError] = useState(null);

  const fetchStarWarsApi = async () => {
    setisLoading(true);

    try {
      const request = await fetch('https://swapi.dev/api/planets');

      if (!request.ok) {
        const json = await request.json();
        throw json.message;
      }

      const returnApi = await request.json();
      const { results } = returnApi;
      setResults(results);
    } catch (e) {
      setError(e);
    } finally {
      setisLoading(false);
    }
  };

  return (
    <FetchContext.Provider
      value={ { isLoading,
        resultsApi,
        apiError,
        fetchStarWarsApi } }
    >
      { children }
    </FetchContext.Provider>
  );
}

FetchProvider.propTypes = {
  children: PropTypes.string.isRequired,
};

export default FetchProvider;
