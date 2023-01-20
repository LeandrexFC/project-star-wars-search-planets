import { createContext } from 'react';

export const fetchContext = createContext();

// function FetchProvider({ children }) {
//   const [returnApi, saveFetch] = useState([]);
//   const { makeFetch } = useFetch();
//   useEffect(() => {
//     const test = async () => {
//       const results = await makeFetch('https://swapi.dev/api/planets');
//       saveFetch(results);
//     };
//     test();
//   }, []);

//   return (
//     <FetchProvider.Provider value={ returnApi }>
//       { children }
//     </FetchProvider.Provider>
//   );
// }

// export default FetchProvider;
