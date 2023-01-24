import React, { useEffect, useContext, useState } from 'react';
import { FetchContext } from '../context/FetchContext';
import '../Css/Table.css';

function Table() {
  const { resultsApi, fetchStarWarsApi } = useContext(FetchContext);
  // const [searchvalue, setSearch] = useState({ });
  const [filteredSearch, setFilteredSearch] = useState({ search: '', filterSearch: '' });
  useEffect(() => {
    const test = async () => {
      await fetchStarWarsApi();
    };

    test();
  }, []);

  const handleSearch = (e) => {
    setFilteredSearch({
      ...filteredSearch,
      search: e.target.value,
      filterSearch: resultsApi.filter((results) => results.name.toLowerCase()
        .includes(e.target.value.toLowerCase())),
    });
  };

  const results = filteredSearch.filterSearch;

  return (
    <div>
      <input
        type="text"
        data-testid="name-filter"
        name="search"
        onChange={ handleSearch }
        value={ filteredSearch.search }
      />
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
            !results ? resultsApi.map((filter) => (
              <tr key={ filter.name } className="trHidden">
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
            )) : (

              results.map((filter) => (
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
              )))

          }
        </tbody>
      </table>
    </div>
  );
}

export default Table;
