import * as yup from 'yup';

export default (urlValidated, list) => {

  const schema = yup
    .string()
    .required()
    .url('Ссылка должна быть валидным URL')
    .notOneOf(
      list.map((link) => link),
      'RSS уже существует',
    );
  return schema.validate(urlValidated.trim());
};