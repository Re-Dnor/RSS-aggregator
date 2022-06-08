import * as yup from 'yup';

export default (urlValidated, list) => {
  const schema = yup
    .string()
    .required('empty')
    .url('invalidURL')
    .notOneOf(
      list.map(({ url }) => url),
      'duplicate',
    );
  return schema.validate(urlValidated.trim());
};
