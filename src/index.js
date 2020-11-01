import './style.css';
import fetchCountries from './fetchCountries';
import debounce from 'lodash.debounce';
import template from './templates/markup_template.hbs';
import { notice, defaultModules } from '@pnotify/core';
import * as PNotifyConfirm from '@pnotify/confirm';
import '@pnotify/core/dist/BrightTheme.css';

//--рендер разметки инпута
const inputArea = document.createElement('input');
inputArea.placeholder = 'Write country name';
inputArea.classList.add('input_country');
const body = document.querySelector('body');
body.append(inputArea);

//--вешаем слушатель на инпут и задержку вызова ф-ции
inputArea.addEventListener('input', debounce(onSearch, 500));

//--ф-ция получения значения инпута, чейнинга промиса и вызова соответствующей значению функции
function onSearch(e) {
  const value = e.target.value;
  fetchCountries(value)
    .then(country => {
      console.log(country);
      if (country.length < 2) {
        console.log('<2' + country);
        renderCountryCard(country);
      } else if (2 <= country.length && country.length <= 10) {
        console.log('<2&&10>');
        renderCountryList(country);
      } else if (country.length > 10) {
        console.log('>10');
        noticeModal();
      }
    })
    .catch(error => {
      console.log('------');
      console.log(error);
      console.log('------');
    });
}

//--ф-ция рендера карточки страны
const renderCountryCard = function (country) {
  const countryCard = document.createElement('div');
  countryCard.classList.add('country_card');
  body.append(countryCard);
  country.map(el => {
    const countryCardMarkup = template(el);
    countryCard.innerHTML = countryCardMarkup;
  });
};
//----
//--ф-ция рендера списка стран от 2 до 10
const renderCountryList = function (country) {
  const countryList = document.createElement('ul');
  countryList.classList.add('country-list');
  body.append(countryList);
  country.map(el => {
    const carrentCountry = document.createElement('li');
    carrentCountry.textContent = el.name;
    countryList.append(carrentCountry);
  });
};
//--функци уведомления о превышенном количестве результата
const noticeModal = function () {
  const myNotice = notice({
    text: "I'm a notice.",
    type: 'notice',
    title: 'Attention!',
    width: '300px',
    minHeight: '16px',
    shadow: true,
    delay: 8000,
    closer: true,
    remove: true,
    destroy: true,
  });
};
