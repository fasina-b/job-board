'use client'
import { Inter } from 'next/font/google'
import '../styles/globals.css'
import NavBar from '../components/navbar'
import Footer from '../components/footer'
import { usePathname } from 'next/navigation'
import { NextAuthProvider } from "./Provider";



const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isAuthPage = ['/sign-up', '/sign-in'].includes(pathname);

  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
        <div className='flex pt-3 flex-col mx-auto min-h-screen'>
          {!isAuthPage && <NavBar />}
          <div className='flex-auto m-5 '>
            {children}
          </div>
          {!isAuthPage && <Footer />}
        </div>
        </NextAuthProvider>
      </body>
    </html>
  )
}
