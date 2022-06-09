export default (title, description, link, i18nextInstance) => {
  const modal = document.querySelector('.modal-content');
  const modalTitle = modal.querySelector('.modal-title');
  const modalDescription = modal.querySelector('.modal-body');
  const modalBtnLink = modal.querySelector('#btn-link');
  const modalWrapperLink = document.getElementById('link');
  const modalBtnClose = modal.querySelector('.btn-secondary');

  modalTitle.textContent = title;
  modalDescription.textContent = description;
  modalBtnLink.textContent = i18nextInstance.t('form.modal.read');
  modalWrapperLink.href = link;
  modalWrapperLink.setAttribute('target', '_blank');
  modalBtnClose.textContent = i18nextInstance.t('form.modal.close');
};
