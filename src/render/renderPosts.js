import removeChild from '../utils/removeChild.js';
import renderModal from './renderModal.js';

export default (value, i18nextInstance) => {
  const posts = document.querySelector('.posts');

  removeChild(posts);

  if (value.length === 0) {
    return;
  }

  const titlePosts = document.createElement('h2');
  const listPosts = document.createElement('ul');

  titlePosts.textContent = i18nextInstance.t('form.posts.title');
  listPosts.classList.add('list-group');

  posts.append(titlePosts);
  posts.append(listPosts);

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
