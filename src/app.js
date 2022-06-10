import i18next from 'i18next';
import onChange from 'on-change';
import validate from './utils/validate.js';
import render from './render/render.js';
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
    button: document.getElementById('btn-submit'),
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

  const updatePosts = () => {
    state.data.feeds.forEach((item) => {
      getData(item.url)
        .then((response) => {
          const { contents } = response.data;
          const { posts } = parser(contents);
          posts.forEach((post) => {
            const { title } = post;
            const oldtPosts = state.data.posts.flat(1);
            const isSaved = oldtPosts.some((oldPost) => oldPost.title === title);
            if (!isSaved) {
              watchedState.data.posts.push([post]);
            }
          });
        });
    });
    setTimeout(updatePosts, 5000);
  };

  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();
    elements.button.disabled = true;
    const formData = new FormData(e.target);
    const url = formData.get('rss-input');

    validate(url, watchedState.data.feeds)
      .then((link) => getData(link))
      .then((response) => {
        const { contents } = response.data;
        const { title, description, posts } = parser(contents);

        watchedState.data.feeds.unshift({
          title,
          description,
          url,
        });

        watchedState.data.posts.push(posts);
        watchedState.form.feedback.error = null;
        watchedState.form.processState = 'success';
        watchedState.form.feedback.success = true;

        elements.input.value = '';

        elements.button.disabled = false;

        updatePosts();
      })
      .catch((error) => {
        watchedState.form.feedback.success = false;
        watchedState.form.feedback.error = error;
        watchedState.form.processState = 'fail';
        elements.input.focus();
        elements.button.disabled = false;
      });
  });

  const select = document.querySelector('.form-select');
  select.addEventListener('change', (e) => {
    const newLanguage = e.target.value;
    i18nextInstance.changeLanguage(newLanguage);
    watchedState.language = newLanguage;
  });
};
