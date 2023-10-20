import ReduxProvider from '@/store/ReduxProvider'
import './globals.css'
import { Rubik, DM_Serif_Display } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Toaster } from 'react-hot-toast'
import ClientOnly from '@/components/ClientOnly'

const rubik = Rubik({ subsets: ['latin'] })
export const dmSerifDisplay = DM_Serif_Display({
  subsets: ['latin'],
  weight: ['400'],
})

export const dynamic = 'force-dynamic'

// Removed for deployment problem
// export const metadata = {
//   title: {
//     default: 'GadgetZone',
//     template: `%s | GadgetZone Shop`,
//   },
//   description: 'Best Gadgets Shop E-Commerce Store',
// }

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>GadgetZone</title>
        <meta
          name="description"
          content="Best Gadgets Shop E-Commerce Store"
        ></meta>
      </head>
      <body className={rubik.className}>
        <ClientOnly>
          <Toaster />
          <ReduxProvider>
            <Header />
            <>{children}</>
            <Footer />
          </ReduxProvider>
        </ClientOnly>
      </body>
    </html>
  )
}
