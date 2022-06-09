import renderModal from './utils/renderModal.js';
import removeChild from './utils/removeAllChildNodes.js';

// RENDER ERROR____________________________
const renderError = (elements, value, i18nextInstance) => {
  const { feedback, input } = elements;
  if (value instanceof Error) {
    console.log(value.message);
    feedback.textContent = i18nextInstance.t(`form.errors.${value.message}`);
    feedback.classList.remove('text-success');
    feedback.classList.add('text-danger');
    input.classList.remove('text-success');
    input.classList.add('is-invalid');
  }
};
// RENDER SUCCESS_________________________________________
const renderSuccess = (elements, value, i18nextInstance) => {
  const { feedback, input } = elements;
  if (value) {
    feedback.textContent = i18nextInstance.t('form.successMessage');
    feedback.classList.add('text-success');
    feedback.classList.remove('text-danger');
    input.classList.remove('is-invalid');
    input.classList.add('text-success');
    setTimeout(() => input.classList.remove('text-success'), 2000);
  } else {
    feedback.textContent = '';
    input.classList.remove('text-success');
  }
};
// RENDER FORM_____________________________
const renderForm = (elements, value, i18nextInstance) => {
  const {
    label, button, title, subtitle, example,
  } = elements;

  label.textContent = i18nextInstance.t('form.label');
  button.textContent = i18nextInstance.t('form.button');
  title.textContent = i18nextInstance.t('header.title');
  subtitle.textContent = i18nextInstance.t('header.subtitle');
  example.textContent = i18nextInstance.t('form.example');
};

// RENDER POSTS_____________________________________________
const renderPosts = (value, i18nextInstance) => {
  const posts = document.querySelector('.posts');

  removeChild(posts);

  if (posts.length === 0) {
    return;
  }

  const titlePosts = document.createElement('h2');
  const listPosts = document.createElement('ul');

  titlePosts.textContent = i18nextInstance.t('form.posts.title');
  listPosts.classList.add('list-group');

  posts.appendChild(titlePosts);
  posts.appendChild(listPosts);
  console.log(value);
  value.forEach((post) => {
    const { title, description, link } = post;
    const liPost = document.createElement('li');
    const aPost = document.createElement('a');
    const btnPost = document.createElement('button');

    liPost.classList.add(
      'list-group-item',
      'd-flex',
      'justify-content-between',
      'align-items-start',
    );

    aPost.classList.add('fw-bold');
    aPost.href = link;
    aPost.setAttribute('target', '_blank');
    aPost.setAttribute('rel', 'noopener noreferrer');
    aPost.setAttribute('data-id', '2');
    aPost.textContent = title;
    aPost.onclick = () => {
      aPost.style.color = '#8E4585';
    };

    btnPost.type = 'button';
    btnPost.textContent = i18nextInstance.t('form.posts.button');
    btnPost.classList.add('btn', 'btn-primary', 'btn-sm');
    btnPost.setAttribute('data-id', '2');
    btnPost.setAttribute('data-bs-toggle', 'modal');
    btnPost.setAttribute('data-bs-target', '#modal');
    btnPost.onclick = () => {
      renderModal(title, description, link, i18nextInstance);
    };

    liPost.append(aPost);
    liPost.append(btnPost);
    posts.append(liPost);
  });
};

// MAIN RENDER________________________________
const render = (elements, state, i18nextInstance) => (path, value) => {
  switch (path) {
    case 'form.processState':
      renderForm(elements, value, i18nextInstance);
      break;
    case 'form.feedback.error':
      renderError(elements, value, i18nextInstance);
      break;
    case 'form.feedback.success':
      renderSuccess(elements, value, i18nextInstance);
      break;
    case 'data.posts':
      renderPosts(value, i18nextInstance);
      break;
    case 'language':
      renderPosts(state.data.posts, i18nextInstance);
      renderForm(elements, state.form.processState, i18nextInstance);
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

export default render;
