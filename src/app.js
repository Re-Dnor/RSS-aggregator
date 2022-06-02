export default () => {
  const form = document.getElementById('rss-form');
  const input = document.getElementById('input_url');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const value = formData.get('url');
    console.log(formData, value)
  })

}