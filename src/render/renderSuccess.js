export default (elements, value, i18nextInstance) => {
  const { feedback, input } = elements;
  if (value) {
    feedback.classList.add('text-success');
    feedback.classList.remove('text-danger');
    input.classList.remove('is-invalid');
    feedback.textContent = i18nextInstance.t('form.successMessage');
  } else {
    input.classList.remove('text-success');
    feedback.classList.add('text-danger');
    feedback.textContent = '';
  }
};
