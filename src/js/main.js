import fetchCountries from './fetchCountries';
import countriesName from '../templates/countriesName.hbs';
import countriesInfo from '../templates/countriesInfo.hbs';
import { error, Stack } from '@pnotify/core';

const debounce = require('lodash.debounce');

const refs = {
    input: document.querySelector('#input'),
    wrapper: document.querySelector('.countriesWrapper')
}

refs.input.addEventListener('input', debounce(onInput), 500)

function onInput(e) {
    e.preventDefault();
    const query = refs.input.value;
    if(refs.input.value !== '')
        fetchCountries(query).then(onSucces).catch(succesError);
}

const onSucces = resolve => {
    refs.wrapper.innerHTML = "";
    if (resolve.length > 10)    {
        const msg = 'Too many matches found. Please enter a more specific query!';
        NotifyMessage(msg);
        return;
    }

    if (resolve.length >= 2 && resolve.length <= 10) {
        const markup = countriesName(resolve);
        refs.wrapper.insertAdjacentHTML('beforeend', markup);
        return;
    }

    if (resolve.length < 2 && resolve.length > 0) {
        const markup = countriesInfo(resolve);
        refs.wrapper.innerHTML = markup;
    }
}

const succesError = () => {
    const msg = 'Error! Please try again later.';
    NotifyMessage(msg);
};

const errorNotify = new Stack ({
  dir1: 'up',
  modal: true,
  firstpos1: 120,
  overlayClose: true,
  context: document.getElementById('container'),
});

function NotifyMessage(msg) {
    error({
        title: 'Too many matches found. Please enter a more specific query!',
        stack: errorNotify,
    });
}