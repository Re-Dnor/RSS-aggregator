export default (i18nextInstance) => {
  const titleFeeds = document.getElementById('title-feeds');
  const titlePosts = document.getElementById('title-posts');
  const linkPost = document.getElementById('list-posts');
  if (titlePosts !== null && linkPost !== null) {
    const btns = linkPost.querySelectorAll('button');

    btns.forEach((btn) => {
      const btnAdd = btn;
      btnAdd.textContent = i18nextInstance.t('form.posts.button');
    });

    titleFeeds.textContent = i18nextInstance.t('form.feeds.title');
    titlePosts.textContent = i18nextInstance.t('form.posts.title');
  }
};
