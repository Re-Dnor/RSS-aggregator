import axios from 'axios';
import proxify from './proxify.js';

export default (link) => {
  const urlProxified = proxify(link);
  return axios.get(urlProxified)
    .catch(() => {
      throw new Error('network');
    });
};
