import removeChild from '../utils/removeChild.js';

export default (value, i18nextInstance) => {
  const feeds = document.querySelector('.feeds');
  removeChild(feeds);

  if (value.length === 0) {
    return;
  }

  const titleFeeds = document.createElement('h2');
  const listFeeds = document.createElement('ul');

  titleFeeds.textContent = i18nextInstance.t('form.feeds.title');
  listFeeds.classList.add('list-group', 'rounded-0');

  feeds.append(titleFeeds);
  feeds.append(listFeeds);

  value.forEach((feed) => {
    const { title, description } = feed;
    const liFeed = document.createElement('li');
    const liTitle = document.createElement('h3');
    const liDescrp = document.createElement('p');

    liFeed.classList.add('list-group-item', 'border-end-0', 'border-0');
    liTitle.classList.add('h6', 'm-0');
    liDescrp.classList.add('m-0', 'small', 'text-black-50');
    liTitle.textContent = title;
    liDescrp.textContent = description;

    liFeed.append(liTitle);
    liFeed.append(liDescrp);
    listFeeds.append(liFeed);
  });
};
