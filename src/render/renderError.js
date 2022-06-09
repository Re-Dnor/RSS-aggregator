export default (elements, value, i18nextInstance) => {
  const { feedback, input } = elements;
  if (value instanceof Error) {
    feedback.textContent = i18nextInstance.t(`form.errors.${value.message}`);
    feedback.classList.remove('text-success');
    feedback.classList.add('text-danger');
    input.classList.remove('text-success');
    input.classList.add('is-invalid');
  }
};