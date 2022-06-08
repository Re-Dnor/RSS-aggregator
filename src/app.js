import i18next from 'i18next';
import onChange from 'on-change';
import _ from 'lodash';
import validate from './utils/validate.js';
import render from './render.js';
import resources from './locales/languages.js';
import getData from './utils/getData.js';
import parser from './utils/parser.js';

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
    language: defaultLanguages,
  };

  const watchedState = onChange(state, render(elements, state, i18nextInstance));
  // ADD EVENT LISTENER FORM________________________
  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const url = formData.get('rss-input');

    validate(url, watchedState.data.feeds, i18nextInstance)
      .then((link) => getData(link))
      .then((response) => {
        const { contents } = response.data;
        const { title, description, posts } = parser(contents);
        const id = _.uniqueId();

        watchedState.data.feeds.unshift({
          title,
          description,
          url,
          id,
        });
        const getIdPosts = [...posts.map((post) => ({ ...post, feedID: id }))];
        const allPosts = [...watchedState.data.posts, ...getIdPosts];
        watchedState.data.posts = allPosts;
        watchedState.form.feedback.error = null;
        watchedState.form.processState = 'success';
        watchedState.form.feedback.success = true;
        console.log(state);

        elements.form.reset();
      })
      .catch((error) => {
        watchedState.form.feedback.success = false;
        watchedState.form.feedback.error = error;
        watchedState.form.processState = 'fail';

        elements.input.focus();
      });
  });

  // CHANGE LANG ADD E LISTENER _________________________________
  const btnLanguage = document.querySelector('.language-change');

  btnLanguage.addEventListener('click', (e) => {
    e.preventDefault();
    const currentLanguage = i18nextInstance.language;
    const newLanguage = currentLanguage === 'ru' ? 'en' : 'ru';
    i18nextInstance.changeLanguage(newLanguage);
    watchedState.language = newLanguage;
    btnLanguage.textContent = currentLanguage === 'ru' ? 'Русский' : 'English';
  });
};
