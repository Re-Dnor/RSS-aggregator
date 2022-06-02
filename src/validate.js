import * as yup from 'yup';

const validate = async (value) => {
  const schema = yup.object().shape({
    website: yup.string().url(),
  });
  try {
    const result = await schema.validate({ website: value });
    return result;
  } catch (err) {
    const message = err.name;
    return message;
  }
};

export default validate;
