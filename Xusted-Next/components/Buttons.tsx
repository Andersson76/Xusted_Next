/* eslint-disable react/react-in-jsx-scope */
import Link from 'next/link'

const navigation = [
  { name: 'Albums', href: '/albums' },
  { name: 'Contact', href: '/contact' },
]

function Buttons() {
  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <div className="pt-5 flex flex-col gap-4 items-center">
      {navigation.map((item) => (
        // eslint-disable-next-line react/react-in-jsx-scope
        <Link key={item.name} href={item.href} legacyBehavior>
          <a className="px-6 py-2 border border-gray-400 rounded-full uppercase text-xs tracking-widest text-gray-500 transition-all inline-block hover:border-[#F7AB0A]/40 hover:text-[#F7AB0A]/40">
            {item.name}
          </a>
        </Link>
      ))}
    </div>
  )
}
export default Buttons
