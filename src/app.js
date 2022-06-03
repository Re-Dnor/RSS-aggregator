import validate from './validate.js';

export default () => {
  const form = document.getElementById('rss-form');
  const input = document.getElementById('input_url');
  const feedback = document.querySelector('.feedback');
  const state = {
    links: [],
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const valueFormData = formData.get('input_url');
    validate(valueFormData)
      .then((website) => {
        if (state.links.includes(website.url)) {
          feedback.textContent = 'RSS уже существует';
          feedback.classList.add('text-danger');
          input.classList.add('is-invalid');
          input.focus();
        } else {
          state.links.push(website.url);
          feedback.textContent = 'RSS успешно загружен';
          feedback.classList.remove('text-danger');
          feedback.classList.add('text-success');
          input.classList.remove('is-invalid');
          form.reset();
        }
      })
      .catch(() => {
        feedback.textContent = 'Ссылка должна быть валидным URL';
        feedback.classList.add('text-danger');
        input.classList.add('is-invalid');
        input.focus();
      });
  });
};
