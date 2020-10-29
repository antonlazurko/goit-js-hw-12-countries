import './style.css';
import fetchCountries from './fetchCountries';
import debounce from 'lodash.debounce';
fetchCountries();
const name = document.createElement('p');
const capital = document.createElement('p');
const population = document.createElement('p');
const languages = document.createElement('ul');
const flag = document.createElement('img');
name.classList.add('name');
capital.classList.add('capital');
population.classList.add('population');
languages.classList.add('languages');
flag.classList.add('flag');

const inputArea = document.createElement('input');
inputArea.placeholder = 'Write country name';
inputArea.classList.add('input_country');
//----
inputArea.addEventListener('input', debounce(updateValue, 1000));

function updateValue() {
  const value = inputArea.value;
  fetch(`https://restcountries.eu/rest/v2/name/${value}`)
    .then(response => {
      return response.json();
    })
    .then(country => {
      if (country.length < 2) {
        name.textContent = country[0].name;
        capital.textContent = country[0].capital;
        population.textContent = country[0].population;
        languages.textContent = country[0].languages[0].name;
        flag.src = `${country[0].flag}`;
      } else if (2 <= country.length && country.length <= 10) {
        console.log(country);

        console.log('10');
      } else {
        console.log('10+');
        console.log(country);
      }
    })
    .catch(console.log('ERROR'));
}
//----
const root = document.querySelector('#country_conteiner');
root.append(inputArea, name, capital, population, languages, flag);
