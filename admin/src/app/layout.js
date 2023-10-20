import ReduxProvider from '@/store/ReduxProvider'
import './globals.css'
import { Work_Sans } from 'next/font/google'
import { Toaster } from 'react-hot-toast'

const ws = Work_Sans({ subsets: ['latin'] })

export const metadata = {
  title: {
    default: 'GadgetZone Admin Panel Dashboard',
    template: `%s | GadgetZone Shop`,
  },
  description:
    'Admin Panel Dashboard Of The Best Gadgets Shop GadgetZone E-Commerce Store in the world',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={ws.className}>
        {' '}
        <Toaster />
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  )
}
