import i18next from 'i18next';
import onChange from 'on-change';
import validate from './utils/validate.js';
import render from './render.js';
import resources from './locales/languages.js';

export default async () => {
  const defaultLanguages = 'ru';
  const i18nextInstance = i18next.createInstance();
  await i18nextInstance.init({
    lng: defaultLanguages,
    debug: false,
    resources,
  });

  const elements = {
    form: document.getElementById('rss-form'),
    input: document.getElementById('rss-input'),
    feedback: document.querySelector('.feedback'),
    title: document.querySelector('h1'),
    subtitle: document.querySelector('.lead'),
    button: document.querySelector('.col-auto'),
    example: document.querySelector('.text-muted'),
    label: document.querySelector('.text-dark'),
  };

  const state = {
    form: {
      processState: 'initial',
      feedback: {
        error: null,
        success: null,
      },
    },
    data: {
      feeds: [],
      posts: [],
    },
    language: null,
  };

  const watchedState = onChange(state, render(elements, state, i18nextInstance));

  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const url = formData.get('rss-input');

    validate(url, watchedState.data.feeds, i18nextInstance)
      .then((link) => {
        watchedState.form.feedback.error = null;
        watchedState.form.processState = 'success';
        watchedState.form.feedback.success = true;
        watchedState.data.feeds.push(link);

        elements.form.reset();
      })
      .catch((error) => {
        watchedState.form.feedback.success = false;
        watchedState.form.feedback.error = error;
        watchedState.form.processState = 'fail';
        // console.log(error)

        elements.input.focus();
      });
  });

  const btnLanguage = document.querySelector('.language-change');

  btnLanguage.addEventListener('click', (e) => {
    e.preventDefault();
    const currentLanguage = i18nextInstance.language;
    const newLanguage = currentLanguage === 'ru' ? 'en' : 'ru';

    i18nextInstance.changeLanguage(newLanguage);
    watchedState.language = newLanguage;
    btnLanguage.textContent = currentLanguage;
  });
};
