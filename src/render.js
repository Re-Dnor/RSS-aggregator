const renderError = (elements, value) => {
  const feedback = elements.feedback;
  const input = elements.input

  if (value instanceof Error) {
    feedback.textContent = value.message;
    feedback.classList.remove('text-success')
    feedback.classList.add('text-danger');
    input.classList.remove('text-success')
    input.classList.add('is-invalid')
  } else {
    feedback.textContent = '';
    feedback.classList.add('text-success')
    feedback.classList.remove('text-danger');
    input.classList.remove('is-invalid')
    input.classList.add('text-success')
  }
}

const handleProcessState = (elements, value) => {
  const { form, input, feedback } = elements
  switch (value) {
    case 'sending':
      feedback.textContent = '';
      break;
  }
}

const render = (elements) => (path, value) => {

  switch (path) {
    case 'form.feedback.error':
      renderError(elements, value)
  }

}

export default render;