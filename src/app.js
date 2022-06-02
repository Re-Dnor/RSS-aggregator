import validate from './validate.js'
import { isEmpty } from 'lodash';

export default () => {
  const form = document.getElementById('rss-form');
  const input = document.getElementById('input_url'); //?
  const feedback = document.querySelector('.feedback');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const valueFormData = formData.get('input_url');
    const valible = validate(valueFormData);
    valible.then((website) => {

      if (isEmpty(website)) {
        input.classList.add('is-invalid');

        feedback.classList.add('text-danger');
        feedback.classList.remove('text-success');
        feedback.textContent = 'Ссылка должна быть валидным URL';

        input.focus();
      } else {
        input.classList.remove('is-invalid');

        feedback.classList.remove('text-danger');
        feedback.classList.add('text-success');
        feedback.textContent = 'Rss успешно загружен';

        form.reset();
      }
    })
  });
};
