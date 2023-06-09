import React, { useContext, useState } from 'react';
import { FetchContext } from '../context/FetchContext';

const num = -1;
function Table() {
  const { planets, setPlanets, isLoading } = useContext(FetchContext);
  const [inputSearch, setSearch] = useState('');
  const [filtered, setFilter] = useState({
    column: 'population',
    operator: 'maior que',
    number: '0' });

  const [allColumns, setColumns] = useState(['surface_water', 'rotation_period',
    'orbital_period',
    'diameter', 'population',
  ]);

  const [orderColumn, setOrderColumns] = useState({
    column: 'population', sort: 'ASC' });

  const filteredInputSearch = planets.planet.filter((result) => result.name
    .includes(inputSearch));

  const handleAllInputs = (e) => {
    const test = allColumns.filter((column) => column !== e.target.value);
    setColumns(test);
    if (filtered.operator === 'menor que') {
      const allResult = planets.planet
        .filter((result) => +result[filtered.column]
        < +filtered.number);
      setPlanets({
        planet: allResult,
      });
    } else if
    (filtered.operator === 'maior que') {
      const allResult2 = planets.planet
        .filter((result) => +result[filtered.column]
        > +filtered.number);
      setPlanets({
        planet: allResult2,
      });
    } else if
    (filtered.operator === 'igual a') {
      const allResult3 = planets.planet
        .filter((results) => +results[filtered.column]
        === +filtered.number);
      setPlanets({
        planet: allResult3,
      });
    }
  };
  const handleOrderFilter = () => {
    if (orderColumn.sort === 'ASC') {
      const resultOrder = planets.planet.sort((a, b) => {
        if (a[orderColumn.column] === 'unknown') return 1;
        if (b[orderColumn.column] === 'unknown') return num;
        return +a[orderColumn.column] - +b[orderColumn.column];
      });
      setPlanets({
        planet: resultOrder,
      });
    } else if (orderColumn.sort === 'DESC') {
      const resultOrder2 = planets.planet.sort((a, b) => {
        if (a[orderColumn.column] === 'unknown') return 1;
        if (b[orderColumn.column] === 'unknown') return num;
        return +b[orderColumn.column] - +a[orderColumn.column];
      });
      setPlanets({
        planet: resultOrder2,
      });
    }
  };
  return (
    <div>
      <input
        type="text"
        data-testid="name-filter"
        name="search"
        onChange={ (e) => setSearch(e.target.value) }
      />
      <div>
        Coluna:
        <select
          name="selectedOption"
          data-testid="column-filter"
          value={ filtered.column }
          id="selectColumn"
          onChange={ (e) => setFilter({ ...filtered, column: e.target.value }) }
        >
          {
            allColumns.map((result) => (
              <option key={ result } value={ result }>
                { result }
              </option>
            ))
          }
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
        <button
          type="button"
          data-testid="button-filter"
          onClick={ handleAllInputs }
          value={ filtered.column }
        >
          Filtrar
        </button>
        <div>
          Ordenar:
          <select
            name="selectedOption"
            data-testid="column-sort"
            value={ orderColumn.column }
            id="selectColumn"
            onChange={ (e) => setOrderColumns({ ...orderColumn,
              column: e.target.value }) }
          >
            {
              allColumns.map((result) => (
                <option key={ result } value={ result }>
                  { result }
                </option>
              ))
            }
          </select>
          <label htmlFor="order">
            <input
              type="radio"
              value="ASC"
              id="Ascendente"
              data-testid="column-sort-input-asc"
              name="order"
              onChange={ (e) => setOrderColumns({ ...orderColumn,
                sort: e.target.value }) }
            />
            Ascendente
          </label>
          <label htmlFor="order">
            Descendente
            <input
              type="radio"
              value="DESC"
              id="Descendente"
              data-testid="column-sort-input-desc"
              name="order"
              onChange={ (e) => setOrderColumns({ ...orderColumn,
                sort: e.target.value }) }
            />
          </label>
          <button
            type="button"
            data-testid="column-sort-button"
            onClick={ handleOrderFilter }
            value={ orderColumn.sort }
          >
            Ordenar
          </button>
        </div>
      </div>
      <table id="table-total">
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
            isLoading ? <h1 data-testid="load">Carregando...</h1> : filteredInputSearch
              .map((filter) => (
                <tr key={ filter.name } className="table">
                  <td data-testid="planet-name">
                    { filter.name}
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
