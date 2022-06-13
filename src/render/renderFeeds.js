export default (value, i18nextInstance) => {
  const feedsElement = document.querySelector('.feeds');
  const createElementPosts = () => {
    const titleFeeds = document.createElement('h2');
    const listElement = document.createElement('ul');
    return [titleFeeds, listElement];
  };

  const [titleFeeds, listElement] = feedsElement.childNodes.length === 0 ? createElementPosts() : [document.getElementById('title-feeds'), document.getElementById('list-feeds')];

  feedsElement.append(titleFeeds);
  titleFeeds.textContent = i18nextInstance.t('form.feeds.title');
  titleFeeds.setAttribute('id', 'title-feeds');

  feedsElement.append(listElement);
  listElement.classList.add('list-group', 'rounded-0');
  listElement.setAttribute('id', 'list-feeds');

  const lastFeed = value[value.length - 1];
  const { title, description } = lastFeed;
  const wrapperFeed = document.createElement('li');
  const headerFeed = document.createElement('h3');
  const descriptionFeed = document.createElement('p');

  wrapperFeed.classList.add('list-group-item', 'border-end-0', 'border-0');
  headerFeed.classList.add('h6', 'm-0');
  descriptionFeed.classList.add('m-0', 'small', 'text-black-50');

  headerFeed.textContent = title;
  descriptionFeed.textContent = description;

  wrapperFeed.append(headerFeed);
  wrapperFeed.append(descriptionFeed);
  listElement.prepend(wrapperFeed);
}
