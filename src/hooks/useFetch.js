// import { useState } from 'react';

// function useFetch() {
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState();

//   const makeFetch = async (url) => {
//     try {
//       setIsLoading(true);

//       const request = await fetch(url);
//       const results = await request.json();

//       if (!request.ok) {
//         const apiError = new Error(
//           `The endpoint ${url} responded with status code: ${request.status}`,
//         );
//         apiError.request = results;
//         throw apiError;
//       }

//       return results;
//     } catch (e) {
//       setError(e);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return { isLoading, error, makeFetch };
// }

// export default useFetch;
