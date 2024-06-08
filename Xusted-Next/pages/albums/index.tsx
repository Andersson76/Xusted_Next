'use client'

import React, { useEffect } from 'react'
import { useAlbum } from '../../contexts/AlbumContext'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { Inter } from 'next/font/google'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const inter = Inter({ subsets: ['latin'] })

export default function Albums() {
  const { albums, setAlbums, addAlbum } = useAlbum()

  useEffect(() => {
    if (albums.length === 0) {
      axios
        .get('/data/albums.json')
        .then((response) => {
          setAlbums(response.data)
        })
        .catch((error) => {
          console.error('Error fetching albums:', error)
        })
    }
  }, [albums, setAlbums])

  return (
    <div className="mt-40">
      <h1 className={`text-2xl font-bold text-gray-800 text-center ${inter}`}>
        EP & Singles
      </h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-10">
        {albums.map((album) => (
          <li key={album.id} className="bg-white p-1">
            <Link href={`/albums/${album.id}`} passHref legacyBehavior>
              <a>
                <Image
                  src={album.cover}
                  alt={album.title}
                  width={200}
                  height={200}
                  className="rounded-md mb-2 shadow-xl p-4"
                />
              </a>
            </Link>
          </li>
        ))}
      </ul>

      <div className="p-10">
        <Formik
          initialValues={{ id: '', title: '' }}
          validationSchema={Yup.object({
            id: Yup.string().required('Required'),
            title: Yup.string().required('Required'),
          })}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            axios
              .post('/api/albums', {
                id: values.id,
                title: values.title,
              })
              .then((response) => {
                addAlbum(response.data)
                resetForm()
              })
              .catch((error) => {
                console.error('Error adding album:', error)
              })
              .finally(() => {
                setSubmitting(false)
              })
          }}
        >
          <Form className="space-y-4 lg-mx-40 mx-10 mt-20 mb-20">
            <h3 className="text-xl font-bold mb-10 text-center">
              Add New Album
            </h3>
            <div>
              <label
                htmlFor="id"
                className="block text-sm font-medium text-gray-700"
              >
                ID
              </label>
              <Field
                type="text"
                name="id"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
              <ErrorMessage
                name="id"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <Field
                type="text"
                name="title"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
              <ErrorMessage
                name="title"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <button
              type="submit"
              className="py-2 px-4 bg-blue-500 text-white rounded-md w-full"
            >
              Add Album
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  )
}
