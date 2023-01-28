import React from 'react';
import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import App from '../App';
import { mokedFetch } from './Mocks/ApiMokked';
import FetchProvider from '../context/FetchContext';
import userEvent from '@testing-library/user-event';

describe('Tests Aplication StarWars', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({ response: mokedFetch })
    })
  })

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('show the inputs', async () => {
    render(
      <FetchProvider>
        <App />
      </FetchProvider>
    );
    const loading = screen.getByText('Carregando...')
    await waitForElementToBeRemoved(loading)

    const text = screen.getByRole('textbox');
    const column = screen.getByText(/coluna:operador:/i)
    const spinButton = screen.getByRole('spinbutton')
    const btn = screen.getByRole('button', {
      name: /filtrar/i
    })
    const columnTable = screen.getByRole('columnheader', {
      name: /name/i
    })

    expect(columnTable).toBeInTheDocument()
    expect(btn).toBeInTheDocument()
    expect(spinButton).toBeInTheDocument()
    expect(text).toBeInTheDocument()
    expect(column).toBeInTheDocument()

  })
  it('test filter', async () => {
    render(
      <FetchProvider>
        <App />
      </FetchProvider>
    );
    const loading = screen.getByText('Carregando...')
    await waitForElementToBeRemoved(loading)

      const table = screen.getByRole('table')
      expect(table).toBeInTheDocument();

      const text = screen.getByRole('textbox')

      userEvent.type(text, 'aa')
      
       const spinn = screen.getByRole('spinbutton')

       userEvent.clear(spinn)
       userEvent.type(spinn, '300')

       expect(spinn.value).toBe('300')
    })

    it('test inputs', async () => {
      render(
        <FetchProvider>
          <App />
        </FetchProvider>
      );
      const loading = screen.getByText('Carregando...')
      await waitForElementToBeRemoved(loading) 
      
      const text = screen.getByRole('textbox')

      userEvent.type(text, 'aa')

      expect(text.value).toBe('aa')

      await waitFor(async () => {
        const table = screen.getAllByRole('row');
        expect(table.length).toBe(1);
      });

      userEvent.clear(text)

      const filters = screen.getByTestId('column-filter');
      expect(filters.value).toBe('population');
      
      userEvent.selectOptions(filters, 'orbital_period');
      expect(filters.value).toBe('orbital_period');
  
      userEvent.selectOptions(filters, 'diameter');
      expect(filters.value).toBe('diameter');
  
      userEvent.selectOptions(filters, 'rotation_period');
      expect(filters.value).toBe('rotation_period');
  
      userEvent.selectOptions(filters, 'surface_water');
      expect(filters.value).toBe('surface_water');

      })

      it('test equals', async () => {
        render(
          <FetchProvider>
            <App />
          </FetchProvider>
        );

        const loading = screen.getByText('Carregando...')
        await waitForElementToBeRemoved(loading) 

        const equalFilter = screen.getByTestId('comparison-filter');

        expect(equalFilter.value).toBe('maior que');

        userEvent.selectOptions(equalFilter, 'menor que');
        expect(equalFilter.value).toBe('menor que');
    
        userEvent.selectOptions(equalFilter, 'igual a');
        expect(equalFilter.value).toBe('igual a');
    })  

    it('test function inputs', async () => {
      render(
        <FetchProvider>
          <App />
        </FetchProvider>
      );

      const loading = screen.getByText('Carregando...')
        await waitForElementToBeRemoved(loading)

        const text = screen.getByRole('textbox')
        userEvent.type(text, 'a')
        expect(text.value).toBe('a')

        const filters = screen.getByTestId('column-filter');
        expect(filters.value).toBe('population');
      
        userEvent.selectOptions(filters, 'rotation_period');
        expect(filters.value).toBe('rotation_period');

        const equalFilter = screen.getByTestId('comparison-filter');

        expect(equalFilter.value).toBe('maior que');

        const spinn = screen.getByRole('spinbutton')

        userEvent.type(spinn, '24')

        expect(spinn.value).toBe('024')

        const btn = screen.getByRole('button', {
          name: /filtrar/i
        })

        userEvent.click(btn)

        await waitFor(async () => {
          const table = screen.getAllByRole('row');
          expect(table.length).toBe(1);
        });
    })

    test('Equal less', async () => {
      render(
        <FetchProvider>
          <App />
        </FetchProvider>
      );
  
      const loading = screen.getByText('Carregando...')
      await waitForElementToBeRemoved(loading)
      
        const filters = screen.getByTestId('column-filter');
        expect(filters.value).toBe('population');
      
        userEvent.selectOptions(filters, 'diameter');
        expect(filters.value).toBe('diameter');

        const equalFilter = screen.getByTestId('comparison-filter');

        expect(equalFilter.value).toBe('maior que');
        userEvent.selectOptions(equalFilter, 'menor que')

        const spinn = screen.getByRole('spinbutton')

        userEvent.type(spinn, '8000')

        expect(spinn.value).toBe('08000')

        const btn = screen.getByRole('button', {
          name: /filtrar/i
        })

        userEvent.click(btn)

        await waitFor(async () => {
          const table = screen.getAllByRole('row');
          expect(table.length).toBe(1);
        });
    });
    it('test orderFilter', async () => {
      render(
        <FetchProvider>
          <App />
        </FetchProvider>
      );
      const loading = screen.getByText('Carregando...')
      await waitForElementToBeRemoved(loading)

      const orderColumn = screen.getByText(/ordenar:/i);
      expect(orderColumn).toBeInTheDocument()

      const orderRadio = screen.getByTestId('column-sort');
      expect(orderRadio.value).toBe('population')
      
      userEvent.selectOptions(orderRadio, 'rotation_period');
      expect(orderRadio.value).toBe('rotation_period');

      const asc = screen.getByTestId('column-sort-input-asc')
      const desc = screen.getByTestId('column-sort-input-desc')

      userEvent.click(asc)

      expect(asc).toBeChecked()
      expect(desc).not.toBeChecked()
      
      const btn = screen.getByRole('button', {
        name: /ordenar/i
      })

      userEvent.click(btn)

    })
});
