import React, { useEffect, useContext } from 'react';
import { FetchContext } from '../context/FetchContext';
import '../Css/Table.css';

function Table() {
  const { resultsApi, fetchStarWarsApi } = useContext(FetchContext);
  useEffect(() => {
    const test = async () => {
      await fetchStarWarsApi();
    };

    test();
  }, []);

  return (
    <div>
      <table>
        <theaded>
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
        </theaded>
        <tbody>
          {
            resultsApi.map((results) => (
              <tr key={ results.name }>
                <td>
                  { results.name }
                </td>

                <td>
                  { results.rotation_period }
                </td>
                <td>
                  { results.orbital_period }
                </td>

                <td>
                  { results.diameter }
                </td>

                <td>
                  { results.climate }
                </td>

                <td>
                  { results.gravity }
                </td>

                <td>
                  { results.terrain }
                </td>

                <td>
                  { results.surface_water }
                </td>

                <td>
                  { results.population }
                </td>

                {/* <td>
                  { results.rotation_period }
                </td> */}

                <td>
                  { results.created }
                </td>

                <td>
                  { results.edited }
                </td>

                <td>
                  { results.url }
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
