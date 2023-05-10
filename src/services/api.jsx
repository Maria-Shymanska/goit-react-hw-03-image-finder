// import axios from 'axios';

// const URL = 'https://pixabay.com/api';
// const API_KEY = '34465474-c3837bc3938f4efd53294c219';

// function fetchPicture(query, page) {
//   const response = axios.get(
//     `?q=${URL}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
//   );

//   return response;
// }

// export default fetchPicture;
const URL = 'https://pixabay.com/api/';
const KEY = '34679822-1c5a5d4931a74610a4cbe01cd';
const FILTER = '&image_type=photo&orientation=horizontal&per_page=12';

function fetchImages(query, page = 1) {
  return fetch(`${URL}?q=${query}&page=${page}&key=${KEY}${FILTER}`).then(
    response => response.json()
  );
}

export default fetchImages;
