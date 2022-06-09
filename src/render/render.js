import renderError from './renderError.js';
import renderSuccess from './renderSuccess.js';
import renderForm from './renderForm.js';
import renderFeeds from './renderFeeds.js';
import renderPosts from './renderPosts.js';

export default (elements, state, i18nextInstance) => (path, value) => {
  switch (path) {
    case 'form.processState':
      renderForm(elements, i18nextInstance);
      break;
    case 'form.feedback.error':
      renderError(elements, value, i18nextInstance);
      break;
    case 'form.feedback.success':
      renderSuccess(elements, value, i18nextInstance);
      break;
    case 'data.feeds':
      renderFeeds(value, i18nextInstance);
      break;
    case 'data.posts':
      renderPosts(value, i18nextInstance);
      break;
    case 'language':
      renderPosts(state.data.posts, i18nextInstance);
      renderFeeds(state.data.feeds, i18nextInstance);
      renderForm(elements, i18nextInstance);

      if (state.form.feedback.error) {
        renderError(elements, state.form.feedback.error, i18nextInstance);
      }
      if (state.form.feedback.success) {
        renderSuccess(elements, state.form.feedback.success, i18nextInstance);
      }
      break;
    default:
      break;
  }
};
