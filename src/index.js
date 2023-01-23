import ReactDOM from 'react-dom/client';
import App from './App';
import FetchProvider from './context/FetchContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <FetchProvider>
    <App />
  </FetchProvider>,
);
