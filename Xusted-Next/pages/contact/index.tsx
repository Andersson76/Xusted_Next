'use client'

import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { motion } from 'framer-motion'
import styles from '@/styles/Home.module.css'

const Contact = () => {
  return (
    <motion.div
      initial={{ x: -500 }}
      animate={{ x: 0 }}
      transition={{ type: 'spring', stiffness: 50 }}
      className="contact"
    >
      <div className={styles.card}>
        <Formik
          initialValues={{ name: '', email: '', message: '' }}
          validationSchema={Yup.object({
            name: Yup.string().required('Required'),
            email: Yup.string()
              .email('Invalid email address')
              .required('Required'),
            message: Yup.string().required('Required'),
          })}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values)
            setSubmitting(false)
          }}
        >
          <Form className="space-y-4 lg-mx-40 mx-10 mt-40 mb-20">
            <h3 className="text-xl font-bold mb-10 text-center">Contact</h3>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <Field
                type="text"
                name="name"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <Field
                type="email"
                name="email"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Message
              </label>
              <Field
                as="textarea"
                name="message"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
              <ErrorMessage
                name="message"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <button
              type="submit"
              className="py-2 px-4 bg-blue-500 text-white rounded-md w-full"
            >
              Send
            </button>
          </Form>
        </Formik>
      </div>
    </motion.div>
  )
}

export default Contact
