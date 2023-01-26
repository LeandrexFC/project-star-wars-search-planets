import React, { useContext, useEffect, useState } from 'react';
import { FetchContext } from '../context/FetchContext';

function Table() {
  const { resultsApi, isLoading, planets, setPlanets } = useContext(FetchContext);

  // const [inputSearch, setSearch] = useState('');
  // const [allInputFilteredd, setInput] = useState({ input: '' });
  const [filtered, setFilter] = useState({ search: '',
    column: 'population',
    operator: 'maior que',
    number: '0' });

  // const filteredInputSearch = allInputFiltered.input.filter((result) => result.name
  //   .includes(filteredSearch));

  // useEffect(() => {
  //   setPlanets({
  //     ...planets,
  //     planet: resultsApi,
  //   });
  // }, []);

  useEffect(() => {
    const planetsFiltered = planets.filter((result) => result.name
      .includes(filtered.search));

    setPlanets(planetsFiltered);
  }, [filtered.search]);

  // useEffect(() => {
  //    planets.filter(())
  // }, [filtered]);

  const handleAllInputs = () => {
    if (filtered.operator === 'menor que') {
      const allResult = resultsApi
        .filter((result) => +result[filtered.column]
        < +filtered.number);
      setPlanets(allResult);
    } else if
    (filtered.operator === 'maior que') {
      const allResult2 = resultsApi
        .filter((result) => +result[filtered.column]
        > +filtered.number);
      setPlanets(allResult2);
    } else if
    (filtered.operator === 'igual a') {
      const allResult3 = resultsApi
        .filter((results) => +results[filtered.column]
        === +filtered.number);
      setPlanets(allResult3);
    }
  };

  return (
    <div>
      <input
        type="text"
        data-testid="name-filter"
        name="search"
        value={ filtered.search }
        onChange={ (e) => setFilter({ ...filtered, search: e.target.value }) }
      />
      <div>
        Coluna:
        <select
          name="selectedOption"
          data-testid="column-filter"
          value={ filtered.column }
          onChange={ (e) => setFilter({ ...filtered, column: e.target.value }) }
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
          value={ filtered.operator }
          onChange={ (e) => setFilter({ ...filtered, operator: e.target.value }) }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <input
          name="filteredNumber"
          type="number"
          data-testid="value-filter"
          value={ filtered.number }
          onChange={ (e) => setFilter({ ...filtered, number: e.target.value }) }
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
            isLoading ? <p>Carregando...</p> : planets.map((filter) => (
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
