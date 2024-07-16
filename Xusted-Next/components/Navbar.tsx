'use client'

import React from 'react'
import Link from 'next/link'
import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon /* XMarkIcon  */ } from '@heroicons/react/24/outline'
import styles from '../styles/Home.module.css'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Albums', href: '/albums' },
  { name: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  //const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <header className={`fixed top-0 z-50`}>
      <nav
        className={`mx-auto flex items-center justify-between p-6 lg:px-8 ${styles.thirteen}`}
        aria-label="Global"
      >
        <div className="flex flex-1">
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href} legacyBehavior>
                <a className="text-sm font-semibold leading-6 text-gray-900">
                  {item.name}
                </a>
              </Link>
            ))}
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
        <Link href="/" legacyBehavior>
          <a className="-m-1.5 p-1.5">
            <span className="sr-only">Xusted</span>
            <h1 className="h-8 w-auto text-gray-700">XUSTED</h1>
          </a>
        </Link>
        <div className="flex flex-1 justify-end">
          {/* {isLoggedIn && (
            <Link href="/profile" legacyBehavior>
              <a className="text-sm font-semibold leading-6 text-gray-900 ml-4"></a>
            </Link>
          )}
          {isLoggedIn ? (
            <button
              onClick={() => setIsLoggedIn(false)} // Handle logout
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Log out <span aria-hidden="true">&rarr;</span>
            </button>
          ) : (
            <Link href="#" legacyBehavior>
              <a
                onClick={() => setIsLoggedIn(true)} // Handle login
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Log in <span aria-hidden="true">&rarr;</span>
              </a>
            </Link>
          )} */}
        </div>
      </nav>
      <Dialog
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10 bg-black bg-opacity-50" />
        <DialogPanel className="fixed top-28 inset-x-0 z-20 w-fit overflow-y-auto bg-white bg-opacity-75 px-6 py-6 rounded-md ml-10">
          <div className="flex items-center justify-between">
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              {/*<XMarkIcon className="h-6 w-6" aria-hidden="true" /> */}
            </button>
          </div>
          <div className="space-y-2">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href} legacyBehavior>
                <a
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              </Link>
            ))}
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}
