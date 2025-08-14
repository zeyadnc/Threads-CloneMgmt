

export const TMDB_CONFIG={
  baseURL:"https://api.themoviedb.org/3",
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  headers:{
    accept:"application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
  },
}



export const fetchPopularMovies=async({query}:{query:string})=>{

// Check if API key exists
if (!TMDB_CONFIG.API_KEY) {
  console.error('API Key is missing! Please set EXPO_PUBLIC_MOVIE_API_KEY');
  throw new Error('API Key is missing');
}

const endpoint =
query?`${TMDB_CONFIG.baseURL}/search/movie?query=${encodeURIComponent(query)}`
:`${TMDB_CONFIG.baseURL}/discover/movie?sort_by=popularity.desc`;

console.log('API Key exists:', !!TMDB_CONFIG.API_KEY);
console.log('API Key length:', TMDB_CONFIG.API_KEY?.length);
console.log('Endpoint:', endpoint);

try {
  const response=await fetch (endpoint,{
    method:"GET",
    headers:TMDB_CONFIG.headers,
  });

  console.log('Response status:', response.status);
  console.log('Response headers:', response.headers);

  if(!response.ok){
    const errorText = await response.text();
    console.error('Error response:', errorText);
    throw new Error("Failed to fetch movies: " + response.status + " " + response.statusText);
  }

  const data=await response.json();
  console.log('API Response:', data);

  return data.results;
} catch (error) {
  console.error('Fetch error:', error);
  throw error;
}

}

// Test function to check if basic fetch works
export const testFetch = async () => {
  try {
    console.log('Testing basic fetch...');
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    const data = await response.json();
    console.log('Test fetch successful:', data);
    return true;
  } catch (error) {
    console.error('Test fetch failed:', error);
    return false;
  }
}















// const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZmUxYWQ0NGZlYmIxZDM5NmE4YmJhZjY2YTE5ZTc4MSIsIm5iZiI6MTc1NTE2Mzk2OS4yMjIwMDAxLCJzdWIiOiI2ODlkYWQ0MTgyOWZiODk5NDE4ZWMxODciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.kNArq0zJ_VLQRofrwi9tmwQS3O6pb2vzwZQEuuxp_b8'
//   }
// };

// fetch(url, options)
//   .then(res => res.json())
//   .then(json => console.log(json))
//   .catch(err => console.error(err));