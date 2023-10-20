import { AiFillInstagram, AiTwotonePhone } from 'react-icons/ai'
import { FaAddressCard } from 'react-icons/fa'
import { BsFacebook, BsTwitter, BsLinkedin, BsGithub } from 'react-icons/bs'
import { BiLogoGmail } from 'react-icons/bi'

const page = () => {
  const social = [
    {
      icon: <BsFacebook size={28} />,
      link: 'https://www.facebook.com/mohammed.evan09/',
    },
    {
      icon: <BsGithub size={28} />,
      link: 'https://github.com/mohammedevan09',
    },
    {
      icon: <BsLinkedin size={28} />,
      link: 'https://www.linkedin.com/in/mohammed-evan-233ab8260/',
    },
    {
      icon: <BsTwitter size={28} />,
      link: 'https://twitter.com/EvanMohammed',
    },
    {
      icon: <AiFillInstagram size={32} />,
      link: 'https://www.instagram.com/mohammed.evan_09',
    },
  ]
  return (
    <div className="grid items-around text-white justify-center xl:pt-44 pt-24 pb-10 gap-10">
      <div className="mx-auto">
        <h1 className="md:text-5xl sm:text-4xl text-3xl">Find Us</h1>
        <div className="w-[70%] h-1 rounded-md bg-white mt-1"></div>
      </div>

      <div className="md:flex grid justify-evenly items-start gap-10 sm:px-0 px-7">
        <form className="">
          <h2 className="text-3xl font-semibold mb-3 mx-auto text-center">
            Contact
          </h2>
          <label
            htmlFor="name"
            className="block mb-1 text-md font-medium text-gray-900 dark:text-white"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            className="mb-3 text-white text-md outline-none block w-full p-2.5 bg-[black] border-b border-indigo-600"
            placeholder="Valo Manush"
          />
          <label
            htmlFor="email"
            className="block mb-1 text-md font-medium text-gray-900 dark:text-white"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="mb-3 text-white text-md outline-none block w-full p-2.5 bg-[black] border-b border-indigo-600"
            placeholder="name@email.com"
          />
          <label
            htmlFor="phoneNo"
            className="block mb-1 text-md font-medium text-gray-900 dark:text-white"
          >
            Mobile Number
          </label>
          <input
            type="number"
            id="phoneNo"
            className="mb-3 text-white text-md outline-none block w-full p-2.5 bg-[black] border-b border-indigo-600"
            placeholder="+00 xxxxxxxx"
          />
          <label
            htmlFor="comment"
            className="block mb-1 text-md font-medium text-gray-900 dark:text-white"
          >
            Comment
          </label>
          <textarea
            type="text"
            id="comment"
            className="mb-3 text-white text-md outline-none block w-full p-2.5 bg-[black] border border-indigo-600"
            placeholder="I am happy with this website!"
          />
          <p
            id="helper-text-explanation"
            className="mt-2 text-md text-gray-500 dark:text-gray-400"
          >
            We’ll never share your details. Read our{' '}
            <a
              href="#"
              className="font-medium text-blue-600 hover:underline dark:text-blue-500"
            >
              Privacy Policy
            </a>
            .
          </p>
        </form>
        <div>
          <div className="h-full">
            <h2 className="text-3xl font-semibold mb-3">
              Get in touch with us
            </h2>
            <div className="grid items-center justify-left gap-4">
              <p className="py-2 pl-1 flex justify-start items-center gap-3">
                <FaAddressCard size={24} /> Agrabad, Chattogram, Bangladesh
              </p>
              <a
                className="py-1 pl-1 flex justify-start items-center gap-3"
                href="tel:017874-76134"
              >
                <AiTwotonePhone size={24} /> 017874-76134
              </a>
              <a
                className="py-2 pl-1 flex justify-start items-center gap-3"
                href="mailto:mohammedevan07@gmail.com"
              >
                <BiLogoGmail size={24} /> mohammedevan07@gmail.com
              </a>
              <div className="flex justify-between gap-2 items-center bottom-8 ml-1">
                {social.map((item, i) => (
                  <a target="_blank" key={i} href={item.link}>
                    {item.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center mx-auto">
        <div className="mx-auto inline-block mb-10 text-left">
          <h1 className="text-5xl">My Location</h1>
          <div className="w-[70%] h-1 rounded-md bg-white mt-1"></div>
        </div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3747160.5126188486!2d87.70299808281017!3d23.484388407554828!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30adaaed80e18ba7%3A0xf2d28e0c4e1fc6b!2sBangladesh!5e0!3m2!1sen!2sbd!4v1695187674117!5m2!1sen!2sbd"
          height="500"
          style={{ border: 0, width: '100vw' }}
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  )
}

export default page
