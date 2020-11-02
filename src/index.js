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

//--рендер разметки блока результата
const fetchResultContainer = document.createElement('div');
fetchResultContainer.classList.add('fetch-result-container');
const body = document.querySelector('body');
body.append(inputArea, fetchResultContainer);

//--вешаем слушатель на инпут и задержку вызова ф-ции
inputArea.addEventListener('input', debounce(onSearch, 1000));

//--ф-ция получения значения инпута, чейнинга промиса и вызова соответствующей значению функции
function onSearch(e) {
  const value = e.target.value;
  fetchCountries(value)
    .then(country => {
      if (country.length < 2) {
        renderCountryCard(country);
      } else if (2 <= country.length && country.length <= 10) {
        renderCountryList(country);
      } else if (country.length > 10) {
        noticeModal();
      }
    })
    .catch(error => {
      console.log(error);
    })
    .finally(() => (inputArea.value = ''));
}

//--ф-ция рендера карточки страны
const renderCountryCard = function (country) {
  country.map(el => {
    const countryCardMarkup = template(el);
    fetchResultContainer.innerHTML = countryCardMarkup;
  });
};

//--ф-ция рендера списка стран от 2 до 10
const renderCountryList = function (country) {
  // рендер списка
  const countryListMarkup = '<ul class="country-list"></ul>';
  fetchResultContainer.innerHTML = countryListMarkup;
  const countryList = document.querySelector('.country-list');
  // рендер элементов списка
  country.map(el => {
    const carrentCountry = document.createElement('li');
    countryList.append(carrentCountry);
    carrentCountry.textContent = el.name;
  });
};
//--функци уведомления о превышенном количестве результата
const noticeModal = function () {
  const myNotice = notice({
    text: 'Too many matches found. Please enter a more specific query!',
    type: 'notice',
    title: 'Attention!',
    addClass: 'notice-modal',
    addModalClass: 'notice-modal',
    width: '265px',
    minHeight: '160px',
    shadow: true,
    delay: 8000,
    closer: true,
    remove: true,
    destroy: true,
  });
};
