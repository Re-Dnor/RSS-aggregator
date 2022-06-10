import renderModal from './renderModal.js';

export default (value, i18nextInstance) => {
  const postsElement = document.querySelector('.posts');
  const createElementPosts = () => {
    const titlePosts = document.createElement('h2');
    const listElement = document.createElement('ul');
    return [titlePosts, listElement];
  };

  const [titlePosts, listElement] = postsElement.childNodes.length === 0 ? createElementPosts() : [document.getElementById('title-posts'), document.getElementById('list-posts')];

  postsElement.append(titlePosts);
  titlePosts.textContent = i18nextInstance.t('form.posts.title');
  titlePosts.setAttribute('id', 'title-posts');

  postsElement.append(listElement);
  listElement.classList.add('list-group');
  listElement.setAttribute('id', 'list-posts');

  const lastPosts = value[value.length - 1];
  lastPosts.reverse();
  lastPosts.forEach((post) => {
    const { title, link, description } = post;
    const wrapperPost = document.createElement('li');
    const linkPost = document.createElement('a');
    const btnPost = document.createElement('button');

    wrapperPost.classList.add(
      'list-group-item',
      'd-flex',
      'justify-content-between',
      'align-items-start',
    );

    linkPost.classList.add('fw-bold');
    linkPost.href = link;
    linkPost.setAttribute('target', '_blank');
    linkPost.setAttribute('rel', 'noopener noreferrer');
    linkPost.setAttribute('data-id', '2');
    linkPost.textContent = title;
    linkPost.onclick = () => {
      linkPost.classList.remove('fw-bold');
      linkPost.classList.add('fw-normal', 'link-secondary');
    };

    btnPost.type = 'button';
    btnPost.textContent = i18nextInstance.t('form.posts.button');
    btnPost.classList.add('btn', 'btn-primary', 'btn-sm', 'btn-view');
    btnPost.setAttribute('data-id', '2');
    btnPost.setAttribute('data-bs-toggle', 'modal');
    btnPost.setAttribute('data-bs-target', '#modal');
    btnPost.onclick = () => {
      linkPost.classList.remove('fw-bold');
      linkPost.classList.add('fw-normal', 'link-secondary');
      renderModal(title, description, link, i18nextInstance);
    };

    wrapperPost.append(linkPost);
    wrapperPost.append(btnPost);
    listElement.prepend(wrapperPost);
  });
};
// const titlePostsElement = document.createElement('h2');
// titlePostsElement.textContent = i18nextInstance.t('form.posts.title');
// const listPostsElement = document.createElement('ul');
// listPostsElement.classList.add('list-group');

// postsElement.append(titlePostsElement);
// postsElement.append(listPostsElement);

// value.forEach((arraysPosts) => {
//   arraysPosts.forEach((post) => {
//     console.log(post)

//     const { title, description, link } = post;
//     const liPost = document.createElement('li');
//     const aPost = document.createElement('a');
//     const btnPost = document.createElement('button');

//     liPost.classList.add(
//       'list-group-item',
//       'd-flex',
//       'justify-content-between',
//       'align-items-start',
//     );

//     aPost.classList.add('fw-bold');
//     aPost.href = link;
//     aPost.setAttribute('target', '_blank');
//     aPost.setAttribute('rel', 'noopener noreferrer');
//     aPost.setAttribute('data-id', '2');
//     aPost.textContent = title;
//     aPost.onclick = () => {
//       aPost.classList.remove('fw-bold');
//       aPost.classList.add('fw-normal', 'link-secondary');
//     };

//     btnPost.type = 'button';
//     btnPost.textContent = i18nextInstance.t('form.posts.button');
//     btnPost.classList.add('btn', 'btn-primary', 'btn-sm');
//     btnPost.setAttribute('data-id', '2');
//     btnPost.setAttribute('data-bs-toggle', 'modal');
//     btnPost.setAttribute('data-bs-target', '#modal');
//     btnPost.onclick = () => {
//       aPost.classList.remove('fw-bold');
//       aPost.classList.add('fw-normal', 'link-secondary');
//       renderModal(title, description, link, i18nextInstance);
//     };

//     liPost.append(aPost);
//     liPost.append(btnPost);
//     postsElement.append(liPost);
//   })
// });
// };
