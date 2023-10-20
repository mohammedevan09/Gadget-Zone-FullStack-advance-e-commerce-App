import { AiFillInstagram } from 'react-icons/ai'
import { BsFacebook, BsTwitter, BsLinkedin, BsGithub } from 'react-icons/bs'
import { FcComboChart } from 'react-icons/fc'

const Footer = () => {
  const infoText = [
    'Privacy Policy',
    'Refund Policy',
    'Shipping Policy',
    'Terms & Conditions',
    'Blogs',
  ]

  const accText = ['About Us', 'Faq', 'Contact']

  const quickLinksText = ['Laptops', 'Headphones', 'Tablets', 'Watch']

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
    <>
      <footer className="bg-[#9dc8ffc7] flex flex-col justify-center items-center w-full 2xl:px-[10rem] lg:px-[5rem] sm:px-[1.5rem] px-2">
        <div className="sm:flex grid md:justify-between justify-center items-center py-6 w-full border-white border-b-[1px] gap-5">
          <div className="flex items-center justify-center gap-3">
            <FcComboChart size={38} />
            <h1 className="xl:text-4xl text-2xl font-bold">
              Sign Up for Newsletter
            </h1>
          </div>
          <div className="flex items-center justify-center bg-white overflow-hidden">
            {' '}
            <input
              type="email"
              name="email"
              className="mt-1 px-3 py-2 bg-[none] border shadow-sm placeholder-slate-400 outline-none block border-none rounded-md sm:text-sm focus:outline-none xl:w-[500px] md:w-[400px] w-[300px] font-bold"
              placeholder="you@example.com"
            />
            <span className="text-xl bg-black text-white py-2 px-1 rounded-sm">
              Subscribe
            </span>
          </div>
        </div>

        <div className="sm:flex grid xs:grid-cols-2 grid-cols-1 justify-between items-start sm:gap-2 gap-[2rem] w-full py-5 relative sm:px-0 xs:px-[4rem] px-[0px] pl-[8px]">
          <div className="h-full break-word">
            <h2 className="md:text-3xl text-2xl font-semibold">Contact Us</h2>
            <div className="grid items-center justify-left relative">
              <p className="py-2 pl-1">Agrabad, Chattogram, Bangladesh</p>
              <a className="py-1 pl-1" href="tel:017874-76134">
                017874-76134
              </a>
              <a className="py-2 pl-1" href="mailto:mohammedevan07@gmail.com">
                mohammedevan07@gmail.com
              </a>
              <div className="flex justify-left gap-2 items-center mb-4">
                {social.map((item, i) => (
                  <a target="_blank" key={i} href={item.link}>
                    {item.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div>
            <h2 className="md:text-3xl text-2xl font-semibold">Information</h2>
            <div className="grid items-center justify-left">
              {infoText?.map((text, i) => (
                <a className="py-2 pl-1" key={i} href="#">
                  {text}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h2 className="md:text-3xl text-2xl font-semibold">Account</h2>
            <div className="grid items-center justify-left">
              {accText?.map((text, i) => (
                <a className="py-2 pl-1" key={i} href="#">
                  {text}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h2 className="md:text-3xl text-2xl  font-semibold">Quick Links</h2>
            <div className="grid items-center justify-left">
              {quickLinksText?.map((text, i) => (
                <a className="py-2 pl-1" key={i} href="#">
                  {text}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="py-4 w-full border-white border-t-[1px] text-center tracking-wider">
          @{new Date().getFullYear()}; Powered by Mohammed Evan.
        </div>
      </footer>
    </>
  )
}

export default Footer
