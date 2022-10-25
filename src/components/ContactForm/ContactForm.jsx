import { Formik } from 'formik';
import * as yup from 'yup';
import PropTypes from 'prop-types';

import {
  Form,
  FormLabel,
  Field,
  ErrorMessage,
  Button,
} from './ContactForm.styled';

const initialValues = { name: '', number: '' };
const validationSchema = yup.object({
  name: yup.string().required(),
  number: yup.string().required(),
});

export const ContactForm = ({ handleSubmit }) => {
  const onSubmit = (values, { resetForm }) => {
    handleSubmit(values);
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form>
        <FormLabel>
          Name
          <Field
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            component="input"
          />
          <ErrorMessage name="name" component="span" />
        </FormLabel>

        <FormLabel>
          <span>Number</span>
          <Field
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            component="input"
          />
          <ErrorMessage name="number" component="span" />
        </FormLabel>
        <Button type="submit">Add contact</Button>
      </Form>
    </Formik>
  );
};

ContactForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }),
};
