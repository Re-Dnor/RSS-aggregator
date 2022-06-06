import onChange from "on-change";
import validate from "./validate.js";
import render from './render.js'

export default () => {
  const elements = {
    form: document.getElementById('rss-form'),
    input: document.getElementById('rss-input'),
    feedback: document.querySelector('.feedback')
  }

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

  const watchedState = onChange(state, render(elements))

  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const url = formData.get('rss-input');

    validate(url, watchedState.data.feeds)
      .then((url) => {
        watchedState.form.feedback.error = null;
        watchedState.form.processState = 'success';
        watchedState.data.feeds.push(url)
      })
      .catch((error) => {
        watchedState.form.feedback.error = error;
        watchedState.form.processState = 'fail';
        console.log(error.message)
      })
  })
}