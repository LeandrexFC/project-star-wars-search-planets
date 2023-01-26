import React, { useEffect, useContext, useState } from 'react';
import { FetchContext } from '../context/FetchContext';

function Table() {
  const { resultsApi, fetchStarWarsApi, isLoading,
    allInputFiltered } = useContext(FetchContext);
  const [filteredSearch, setFilteredSearch] = useState('');
  const [filteredColumn, setColumn] = useState('population');
  const [filteredEqual, setEqual] = useState('maior que');
  const [filterNumber, setNumber] = useState({ filteredNumber: '0' });
  const [allInputFilteredd, setInput] = useState({ input: '' });

  const filteredInputSearch = allInputFiltered.input.filter((result) => result.name
    .includes(filteredSearch));

  useEffect(() => {
    const callApi = async () => {
      await fetchStarWarsApi();
    };

    callApi();
  }, []);

  const handleNumberInput = (e) => {
    const { name, value } = e.target;
    setNumber({
      ...filterNumber,
      [name]: value,
    });
  };

  const handleAllInputs = () => {
    if (filteredEqual === 'menor que') {
      const allResult = resultsApi
        .filter((result) => result[filteredColumn]
        < filterNumber.filteredNumber)
        .map((result) => result);
      setInput({
        ...allInputFilteredd,
        input: allResult,
      });
    } else if
    (filteredEqual === 'maior que') {
      const allResult2 = resultsApi
        .filter((result) => result[filteredColumn]
        > filterNumber.filteredNumber)
        .map((result) => result);
      setInput({
        ...allInputFilteredd,
        input: allResult2,
      });
    } else if
    (filteredEqual === 'igual a') {
      const allResult3 = resultsApi
        .filter((results) => results[filteredColumn]
        === filterNumber.filteredNumber)
        .map((result) => result);
      setInput({
        ...allInputFilteredd,
        input: allResult3,
      });
    }
  };

  return (
    <div>
      <input
        type="text"
        data-testid="name-filter"
        name="search"
        onChange={ (e) => setFilteredSearch(e.target.value) }
      />
      <div>
        Coluna:
        <select
          name="selectedOption"
          data-testid="column-filter"
          onChange={ (e) => setColumn(e.target.value) }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
        Operador:
        <select
          name="selectEqual"
          data-testid="comparison-filter"
          onChange={ (e) => setEqual(e.target.value) }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <input
          name="filteredNumber"
          type="number"
          data-testid="value-filter"
          onChange={ handleNumberInput }
          value={ filterNumber.filteredNumber }
        />
        <button type="button" data-testid="button-filter" onClick={ handleAllInputs }>
          Filtrar
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name </th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {
            isLoading ? <p>Carregando...</p> : filteredInputSearch.map((filter) => (
              <tr key={ filter.name }>
                <td>
                  { filter.name }
                </td>

                <td>
                  { filter.rotation_period }
                </td>
                <td>
                  { filter.orbital_period }
                </td>

                <td>
                  { filter.diameter }
                </td>

                <td>
                  { filter.climate }
                </td>

                <td>
                  { filter.gravity }
                </td>

                <td>
                  { filter.terrain }
                </td>

                <td>
                  { filter.surface_water }
                </td>

                <td>
                  { filter.population }
                </td>

                <td>
                  { filter.films.map((film) => film) }
                </td>

                <td>
                  { filter.created }
                </td>

                <td>
                  { filter.edited }
                </td>

                <td>
                  { filter.url }
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}
export default Table;
