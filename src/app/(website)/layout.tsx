import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import PageIntro from '@/components/layout/PageIntro'
import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='min-h-screen'>
      <PageIntro />
      <Header />
      {children}
      <Footer />
    </div>
  )
}

export default layout
