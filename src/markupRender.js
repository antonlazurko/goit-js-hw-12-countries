export default function murkupRender() {
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
  const countryConteiner = document.querySelector('#country_conteiner');
  countryConteiner.append(name, capital, population, languages, flag);
}
