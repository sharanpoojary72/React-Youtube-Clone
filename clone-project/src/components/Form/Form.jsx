import React, { useState } from 'react';
import './Form.css';
import { formSchema } from '../../schema';
import { useFormik } from 'formik';
import { IoMdClose } from "react-icons/io";

const initialValues = {
    username: '',
    email: '',
    message: '',
};

const Form = ({formMenu, setFormMenu}) => {
    const [formStatus, setFormStatus] = useState('');

    const { touched, values, handleChange, handleSubmit, handleBlur, handleReset, errors } = useFormik({
        initialValues: initialValues,
        validationSchema: formSchema,
        onSubmit: async (values, { resetForm }) => {
            console.log(values);

            try {
                // Send the form data to Formspree
                const response = await fetch('https://formspree.io/f/xkgnbjaq', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                });

                if (response.ok) {
                    setFormStatus('Thank you! Your feedback has been submitted.');
                    handleReset();
                } else {
                    setFormStatus('Oops! There was an error submitting your feedback.');
                }
            } catch (error) {
                setFormStatus('Oops! There was an error submitting your feedback.');
                console.error(error);
            }
        }
    });

    return (
        <div className={`submit-form ${formMenu? "submit-form-visible":''}`}>
            <div className='form-head'>
                <h3>Send Feedback To YouTube</h3>
                <button onClick={() => setFormMenu(prev => prev === false)} >
                    <IoMdClose className='close' />
                </button>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='formSection'>
                    <div>
                        <label htmlFor="username">Username*</label>
                        <input type="text" name="username" value={values.username} onChange={handleChange} onBlur={handleBlur} id="username" />
                        {errors.username && touched.username && <small style={{ color: 'red' }}>{errors.username}</small>}
                    </div>
                    <div>
                        <label htmlFor="email">Email*</label>
                        <input type="text" name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} id="email" />
                        {errors.email && touched.email && <small style={{ color: 'red' }}>{errors.email}</small>}
                    </div>
                    <div>
                        <label htmlFor="message">Describe your feedback*</label>
                        <textarea name="message" value={values.message} onChange={handleChange} onBlur={handleBlur} id="message" placeholder='Tell us what prompted this feedback...'/>
                        {errors.message && touched.message && <small style={{ color: 'red' }}>{errors.message}</small>}
                        <p>Please don’t include any sensitive information</p>
                    </div>
                    <div>
                        <p>
                            Some account and system information may be sent to Google. We will use it to fix problems and improve our services, subject to our Privacy Policy and Terms of Service. We may email you for more information or updates. Go to Legal Help to ask for content changes for legal reasons.
                        </p>
                    </div>
                </div>
                <div className='submit'>
                    <button type='submit' className='btn'>Send</button>
                </div>
            </form>
            {formStatus && <p className="form-status">{formStatus}</p>}
        </div>
    );
};

export default Form;
