import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { motion } from 'framer-motion'
import emailjs from 'emailjs-com'

interface FormValues extends Record<string, unknown> {
  name: string
  email: string
  message: string
}

export default function Contact() {
  const sendEmail = (values: FormValues) => {
    emailjs
      .send(
        'service_jess2sh', // replace with your service ID
        'template_jekjnjh', // replace with your template ID
        values, // make sure this object contains { name, email, message }
        'L_YpGK_acTY0KRA5S', // replace with your user ID
      )
      .then((response) => {
        console.log('Email successfully sent!', response.status, response.text)
        alert('Message sent successfully!')
      })
      .catch((error) => {
        console.error('Failed to send email.', error)
        alert('Failed to send message')
      })
  }

  return (
    <motion.div
      className="flex flex-col items-center justify-center p-5 mt-20"
      initial={{ x: -500 }}
      animate={{ x: 0 }}
      transition={{ type: 'spring', stiffness: 50 }}
    >
      <Formik
        initialValues={{ name: '', email: '', message: '' }}
        validationSchema={Yup.object({
          name: Yup.string().required('Required'),
          email: Yup.string()
            .email('Invalid email address')
            .required('Required'),
          message: Yup.string().required('Required'), // make sure message is required
        })}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          sendEmail(values)
          setSubmitting(false)
          resetForm()
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="flex flex-col gap-4 w-full max-w-lg mx-auto p-5 border border-gray-200 rounded-lg shadow-md bg-gray-200">
            <h3 className="text-xl font-bold mb-5 text-center text-black opacity-75">
              Contact
            </h3>
            <div>
              <label
                htmlFor="name"
                className="text-sm font-medium text-black opacity-80"
              >
                Name
              </label>
              <Field
                type="text"
                name="name"
                className="w-full p-2 mt-1 border border-gray-300 rounded"
              />
              {errors.name && touched.name && (
                <div className="text-red-500 text-sm mt-1">
                  <ErrorMessage name="name" />
                </div>
              )}
            </div>
            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium text-black opacity-80"
              >
                Email
              </label>
              <Field
                type="email"
                name="email"
                className="w-full p-2 mt-1 border border-gray-300 rounded"
              />
              {errors.email && touched.email && (
                <div className="text-red-500 text-sm mt-1">
                  <ErrorMessage name="email" />
                </div>
              )}
            </div>
            <div>
              <label
                htmlFor="message"
                className="text-sm font-medium text-black opacity-80"
              >
                Message
              </label>
              <Field
                as="textarea"
                name="message"
                className="w-full p-2 mt-1 border border-gray-300 rounded h-28"
              />
              {errors.message && touched.message && (
                <div className="text-red-500 text-sm mt-1">
                  <ErrorMessage name="message" />
                </div>
              )}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="p-3 text-white bg-blue-600 rounded hover:bg-blue-700"
            >
              Send
            </button>
          </Form>
        )}
      </Formik>
    </motion.div>
  )
}
