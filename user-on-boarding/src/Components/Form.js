import React from 'react';
import axios from 'axios';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';
// TODO Need to finish step 4

const UserForm = ({ errors, touched, values }) => {
	return (
		<div className="user-form">
			<h1 className="user-form-h1">User Form</h1>
			<Form>
				{touched.username && errors.username && <p className="error">{errors.username}</p>}
				<Field className="form-input" type="text" name="username" placeholder="username" />

				{touched.email && errors.email && <p className="error">{errors.email}</p>}
				<Field className="form-input" type="email" name="email" placeholder="email" />

				{touched.password && errors.password && <p className="error">{errors.password}</p>}
				<Field className="form-input" type="password" name="password" placeholder="password" />

				<label className="form-checkbox-label">
					{touched.terms && errors.terms && <p className="error">{errors.terms}</p>}
					<Field className="form-checkbox" type="checkbox" name="terms" checked={values.terms} />
					I've read Terms and Conditions
				</label>

				<button type="submit">Submit</button>
			</Form>
		</div>
	);
};

const FormikUserForm = withFormik({
	mapPropsToValues({ username, email, password, terms }) {
		return {
			username: username || '',
			email: email || '',
			password: password || '',
			terms: terms || false
		};
	},

	validationSchema: Yup.object().shape({
		username: Yup.string().required('* Must enter a username'),
		email: Yup.string().required('* Must enter a email'),
		password: Yup.string().required('* Must enter a password'),
		terms: Yup.boolean().required()
	}),

	handleSubmit(values) {
		axios
			.post('https://reqres.in/api/users', values)
			.then((res) => console.log(res))
			.catch((err) => console.log(err.response));
	}
})(UserForm);

// * Change the name to match the formik binding otherwise, you will get an error.
export default FormikUserForm;
