export default (elements, value, i18nextInstance) => {
  const { feedback, input } = elements;
  if (value) {
    feedback.textContent = i18nextInstance.t('form.successMessage');
    feedback.classList.add('text-success');
    feedback.classList.remove('text-danger');
    input.classList.remove('is-invalid');
  } else {
    feedback.textContent = '';
    input.classList.remove('text-success');
  }
};
