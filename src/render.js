// RENDER ERROR____________________________
const renderError = (elements, value, i18nextInstance) => {
  const { feedback, input } = elements;
  if (value instanceof Error) {
    feedback.textContent = i18nextInstance.t(`form.errors.${value.message}`);
    feedback.classList.remove('text-success');
    feedback.classList.add('text-danger');
    input.classList.remove('text-success');
    input.classList.add('is-invalid');
  }
};
// RENDER SUCCESS_________________________________________
const renderSuccess = (elements, value, i18nextInstance) => {
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
// RENDER FORM_____________________________
const renderForm = (elements, value, i18nextInstance) => {
  const {
    label, button, title, subtitle, example,
  } = elements;

  label.textContent = i18nextInstance.t('form.label');
  button.textContent = i18nextInstance.t('form.button');
  title.textContent = i18nextInstance.t('header.title');
  subtitle.textContent = i18nextInstance.t('header.subtitle');
  example.textContent = i18nextInstance.t('form.example');
};

// MAIN RENDER________________________________
const render = (elements, state, i18nextInstance) => (path, value) => {
  // console.log(path)
  switch (path) {
    case 'form.processState':
      renderForm(elements, value, i18nextInstance);
      break;
    case 'form.feedback.error':
      renderError(elements, value, i18nextInstance);
      break;
    case 'form.feedback.success':
      renderSuccess(elements, value, i18nextInstance);
      break;
    case 'language':
      renderForm(elements, value, i18nextInstance);
      if (state.form.feedback.error) {
        renderError(elements, state.form.feedback.error, i18nextInstance);
      }
      if (state.form.feedback.success) {
        renderSuccess(elements, state.form.feedback.success, i18nextInstance);
      }
      break;
    default:
      break;
  }
};

export default render;
