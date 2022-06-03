import * as yup from 'yup';

const validate = (value) => {
  const schema = yup.object().shape({
    url: yup.string().url(),
  });

  return schema.validate({ url: value });
};

export default validate;
