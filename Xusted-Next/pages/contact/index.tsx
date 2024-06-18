'use client'

import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { motion } from 'framer-motion'
import styled from 'styled-components'

const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  margin-top: 80px;
`

const FormContainer = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 500px;
  margin: 40px auto;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #ffff;
  opacity: 70%;
`

const Input = styled(Field)`
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
`

const TextArea = styled(Field)`
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
`

const ErrorMessageStyled = styled(ErrorMessage)`
  color: red;
  font-size: 0.875rem;
`

const SubmitButton = styled.button`
  padding: 0.75rem;
  font-size: 1rem;
  color: white;
  background-color: #005bb5;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0070f3;
  }
`

export default function Contact() {
  return (
    <Container
      initial={{ x: -500 }}
      animate={{ x: 0 }}
      transition={{ type: 'spring', stiffness: 50 }}
      className="contact"
    >
      <Formik
        initialValues={{ name: '', email: '', message: '' }}
        validationSchema={Yup.object({
          name: Yup.string().required('Required'),
          email: Yup.string()
            .email('Invalid email address')
            .required('Required'),
          /* message: Yup.string().required('Required'), */
        })}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            const response = await fetch('/api/send-email', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(values),
            })

            if (response.ok) {
              alert('Message sent successfully!')
              resetForm()
            } else {
              alert('Failed to send message')
            }
          } catch (error) {
            console.error('Error sending message:', error)
            alert('Failed to send message')
          } finally {
            setSubmitting(false)
          }
        }}
      >
        {({ isSubmitting }) => (
          <FormContainer>
            <h3 className="text-xl font-bold mb-10 text-center text-gray-300">
              Contact
            </h3>
            <div>
              <Label htmlFor="name">Name</Label>
              <Input type="text" name="name" />
              <ErrorMessageStyled name="name" component="div" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input type="email" name="email" />
              <ErrorMessageStyled name="email" component="div" />
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <TextArea as="textarea" name="message" />
              <ErrorMessageStyled name="message" component="div" />
            </div>
            <SubmitButton type="submit" disabled={isSubmitting}>
              Send
            </SubmitButton>
          </FormContainer>
        )}
      </Formik>
    </Container>
  )
}
