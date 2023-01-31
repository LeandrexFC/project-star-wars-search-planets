import React from 'react';
import { render, screen, waitFor} from '@testing-library/react';
import App from '../App';
import { mokedFetch } from './Helper/ApiMokked';
import FetchProvider from '../context/FetchContext';
import userEvent from '@testing-library/user-event';

describe('Tests Aplication StarWars', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({results: mokedFetch})
    })
  })
  afterEach(() => {
    jest.clearAllMocks();
  });
  
  
  test('if renders the inputs', async () => {
    render(
      <FetchProvider>
        <App />
      </FetchProvider>
    )

    const text = screen.getByTestId('name-filter')
      const columnFilter = screen.getByTestId('column-filter');
      const operatorFilter = screen.getByTestId('comparison-filter')
      const spinn = screen.getByRole('spinbutton')
      const btn = screen.getByRole('button', {  name: /filtrar/i})
      const columnSort = screen.getByTestId('column-sort')
      const asc = screen.getByTestId('column-sort-input-asc')
      const desc = screen.getByTestId('column-sort-input-desc')
      const orderBtn = screen.getByRole('button', {  name: /ordenar/i})

      expect(text).toBeInTheDocument()
      expect(columnFilter).toBeInTheDocument()
      expect(operatorFilter).toBeInTheDocument()
      expect(spinn).toBeInTheDocument()
      expect(btn).toBeInTheDocument()
      expect(columnSort).toBeInTheDocument()
      expect(asc).toBeInTheDocument()
      expect(desc).toBeInTheDocument()
      expect(orderBtn).toBeInTheDocument()
  })
   test('if renders the th', async () => {
 render(
       <FetchProvider>
        <App />
       </FetchProvider>
     )  

    const name = screen.getByRole('columnheader', { name: /name/i})
    const rotation = screen.getByRole('columnheader', {  name: /rotation period/i})
    const orbital = screen.getByRole('columnheader', {  name: /orbital period/i})
    const diameter = screen.getByRole('columnheader', {  name: /diameter/i})
    const climate = screen.getByRole('columnheader', {  name: /climate/i})
    const gravity = screen.getByRole('columnheader', {  name: /gravity/i})
    const terrain = screen.getByRole('columnheader', {  name: /terrain/i})
    const surface = screen.getByRole('columnheader', {  name: /surface water/i})
    const population = screen.getByRole('columnheader', {  name: /population/i})
    const films = screen.getByRole('columnheader', {  name: /films/i})
    const created = screen.getByRole('columnheader', {  name: /created/i})
    const edited = screen.getByRole('columnheader', {  name: /edited/i})
    const url = screen.getByRole('columnheader', {  name: /url/i})

    expect(name).toBeInTheDocument()
    expect(rotation).toBeInTheDocument()
    expect(orbital).toBeInTheDocument()
    expect(diameter).toBeInTheDocument()
    expect(climate).toBeInTheDocument()
    expect(gravity).toBeInTheDocument()
    expect(terrain).toBeInTheDocument()
    expect(population).toBeInTheDocument()
    expect(films).toBeInTheDocument()
    expect(created).toBeInTheDocument()
    expect(edited).toBeInTheDocument()
    expect(url).toBeInTheDocument()

  })

  test('if renders the planets', async () => {
    render(
          <FetchProvider>
           <App />
          </FetchProvider>
        ) 

        const planets = await screen.findAllByTestId('planet-name');
        expect(planets.length).toBe(10)
  })

  test('if renders the correct planets when searching', async () => {
    render(
          <FetchProvider>
           <App />
          </FetchProvider>
        ) 

      const text = screen.getByRole('textbox')

      userEvent.type(text, 'Naboo')
      expect(text.value).toBe('Naboo')

      await waitFor(async () => {
        const row = screen.getAllByRole('row');
        expect(row.length).toBe(2);
      });

      userEvent.clear(text)

      userEvent.type(text, 'a')

      await waitFor(async () => {
        const row = screen.getAllByRole('row');
        const tatoo = screen.getByRole('cell', {  name: /tatooine/i})
        const alderaan = screen.getByRole('cell', {  name: /alderaan/i})
        const yavin = screen.getByRole('cell', {  name: /yavin iv/i})
        const dagobah = screen.getByRole('cell', {  name: /dagobah/i})
        const naboo = screen.getByRole('cell', {  name: /naboo/i})
        const coruscant = screen.getByRole('cell', {  name: /coruscant/i})
        const kamino = screen.getByRole('cell', {  name: /kamino/i})
        expect(row.length).toBe(8);
        expect(tatoo).toBeInTheDocument()
        expect(alderaan).toBeInTheDocument()
        expect(yavin).toBeInTheDocument()
        expect(dagobah).toBeInTheDocument()
        expect(naboo).toBeInTheDocument()
        expect(coruscant).toBeInTheDocument()
        expect(kamino).toBeInTheDocument()

      });
  })

  test('if renders the column return correct', async () => {
    render(
          <FetchProvider>
           <App />
          </FetchProvider>
        ) 

       const column = screen.getByTestId('column-filter')
       expect(column.value).toBe('population')

       userEvent.selectOptions(column, 'rotation_period')
       expect(column.value).toBe('rotation_period')
      
       
       userEvent.selectOptions(column, 'orbital_period')
       expect(column.value).toBe('orbital_period')

       userEvent.selectOptions(column, 'diameter')
       expect(column.value).toBe('diameter')
       
       userEvent.selectOptions(column, 'surface_water')
       expect(column.value).toBe('surface_water')

  })

  test('if orders the planets', async () => {
    render(
          <FetchProvider>
           <App />
          </FetchProvider>
        ) 

      await waitFor(() => {
        const columnSort = screen.getByTestId('column-sort')

      userEvent.selectOptions(columnSort, 'rotation_period')

      expect(columnSort.value).toBe('rotation_period')

      const asc = screen.getByTestId('column-sort-input-desc')

      userEvent.click(asc)
      expect(asc).toBeChecked()

      const orderBtn = screen.getByTestId('column-sort-button')

      userEvent.click(orderBtn)
        const row = screen.getAllByRole('row');
        expect(row.length).toBe(11);
        expect(row[1].childNodes[0].textContent).toBe('Kamino');
      });
  })

  test('if equals are corrects', async () => {
    render(
          <FetchProvider>
           <App />
          </FetchProvider>
        ) 
        const column = screen.getByTestId('column-filter')
        expect(column.value).toBe('population')

        userEvent.selectOptions(column, 'diameter')
        expect(column.value).toBe('diameter')

        await waitFor(async () => {
          

        const comparison = screen.getByTestId('comparison-filter')

        userEvent.selectOptions(comparison, 'menor que')

        const filterInput = screen.getByTestId('value-filter')

        userEvent.type(filterInput, '10000')

        const btn = screen.getByTestId('button-filter')

        userEvent.click(btn)
          const row = screen.getAllByRole('row');
          expect(row.length).toBe(11);
        });

  })

  test('if equals bigger are corrects', async () => {
    render(
          <FetchProvider>
           <App />
          </FetchProvider>
        ) 

      await waitFor(async () => {
        const filterInput = screen.getByTestId('value-filter')

        userEvent.clear(filterInput)

        userEvent.type(filterInput, '20000')

      const btn = screen.getByRole('button', {
        name: /filtrar/i
      })

      userEvent.click(btn)
        const row = screen.getAllByRole('row');
        expect(row.length).toBe(8);
      });
  })

  test('if equals bigger are corrects', async () => {
    render(
          <FetchProvider>
           <App />
          </FetchProvider>
        ) 
        

        await waitFor( () => {
          const column = screen.getByTestId('column-filter')
        expect(column.value).toBe('population')

        userEvent.selectOptions(column, 'orbital_period')
        expect(column.value).toBe('orbital_period')

        const operatorFilter = screen.getByTestId('comparison-filter')
        userEvent.selectOptions(operatorFilter, 'igual a')
        expect(operatorFilter.value).toBe('igual a')
        
        const spinn = screen.getByTestId('value-filter')

        userEvent.clear(spinn)
        userEvent.type('341')


        const btn = screen.getByRole('button', {
          name: /filtrar/i
        })

        userEvent.click(btn)
          const row = screen.getAllByRole('row');
        expect(row.length).toBe(1);
        })
  })

  test('if orders the planets', async () => {
    render(
          <FetchProvider>
           <App />
          </FetchProvider>
        ) 


      await waitFor(() => {

      const columnSort = screen.getByTestId('column-sort')

      userEvent.selectOptions(columnSort, 'rotation_period')

      expect(columnSort.value).toBe('rotation_period')

      const asc = screen.getByTestId('column-sort-input-asc')

      userEvent.click(asc)
      expect(asc).toBeChecked()

      const orderBtn = screen.getByTestId('column-sort-button')

      userEvent.click(orderBtn)
        const row = screen.getAllByRole('row');
        expect(row.length).toBe(11);
        expect(row[1].childNodes[0].textContent).toBe('Bespin');
      });
  })

})
