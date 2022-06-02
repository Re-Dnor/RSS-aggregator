import * as yup from 'yup';

export default async (value) => {
  yup.setLocale({
    string: {
      website: 'Invalid url ',
    },
  });

  let schema = yup.object().shape({
    website: yup.string().url()
  });
  try {
    const result = await schema.validate({ website: value });
    return result;
  } catch (err) {
    err.name;
  }
}
