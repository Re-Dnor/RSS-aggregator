import axios from 'axios';

export default (url) => {
  const uri = encodeURIComponent(url);
  const proxy = `https://allorigins.hexlet.app/get?disableCache=true&url=${uri}`;
  return axios.get(proxy)
    .catch(() => {
      throw new Error('network');
    });
};
