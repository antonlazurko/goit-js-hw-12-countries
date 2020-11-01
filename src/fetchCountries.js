export default function fetchCountries(value) {
  return fetch(`https://restcountries.eu/rest/v2/name/${value}`).then(
    response => {
      if (response.ok) {
        return response.json();
      }
      // else {
      //   console.log('Whrong data');
      // }
    },
  );
}
