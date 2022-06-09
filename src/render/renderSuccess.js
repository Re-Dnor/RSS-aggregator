export default (elements, value, i18nextInstance) => {
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