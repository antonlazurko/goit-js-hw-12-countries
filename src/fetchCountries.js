export default function fetchCountries(value) {
  return fetch(`https://restcountries.eu/rest/v2/name/${value}`).then(
    response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    },
  );
}
