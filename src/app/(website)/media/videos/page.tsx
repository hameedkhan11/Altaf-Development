import { Hero } from '@/components/common/Hero'
import VideosPage from '@/components/media/VideoGallery'

const page = () => {
  return (
    <>
        <Hero 
        backgroundType='image'
        backgroundSrc='Booking1_rg1bhs'
        fallbackImage='luxury-apartments/hero-contact-fallback'
        height='three-quarter'
        breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Media', href: '/media' },
            { label: 'Videos', href: '/media/videos' },
        ]}
        overlay='medium'
        contentAlignment='center'
        ariaLabel='Video Gallery Hero Section'
        />
        <VideosPage />
    </>
  )
}

export default page