const parse = (data) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(data, 'application/xml');

  const title = doc.querySelector('title').textContent;
  const description = doc.querySelector('description').textContent;
  const items = doc.querySelectorAll('item');

  const posts = Array.from(items).reduce((acc, val) => {
    const titleItem = val.querySelector('title');
    const descrpItem = val.querySelector('description');
    const linkItem = val.querySelector('link');
    const pubDateItem = val.querySelector('pubDate');

    const obj = {
      title: titleItem.textContent,
      description: descrpItem.textContent,
      link: linkItem.textContent,
      pubDate: pubDateItem.textContent,
    };

    acc.push(obj);

    return acc;
  }, []);

  return { title, description, posts };
};

export default (data) => {
  try {
    return parse(data);
  } catch (e) {
    throw new Error('invalidFormat');
  }
};
