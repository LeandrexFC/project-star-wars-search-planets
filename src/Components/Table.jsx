// import { useEffect } from 'react';
import { useEffect } from 'react';
import useFetch from '../hooks/useFetch';

function Table() {
  const { makeFetch } = useFetch();
  useEffect(() => {
    const test = async () => {
      const results = await makeFetch('https://swapi.dev/api/planets');
      console.log(results);
    };
    test();
  }, []);

  return (
    <p>test</p>
  );
}

export default Table;
