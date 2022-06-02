export default () => {
  const form = document.getElementById('rss-form');
  const input = document.getElementById('input_url');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(input.value);
  });
};
