export default (elements, i18nextInstance) => {
  const {
    label, button, title, subtitle, example,
  } = elements;

  label.textContent = i18nextInstance.t('form.label');
  button.textContent = i18nextInstance.t('form.button');
  title.textContent = i18nextInstance.t('header.title');
  subtitle.textContent = i18nextInstance.t('header.subtitle');
  example.textContent = i18nextInstance.t('form.example');
};
