import AboutPage from '@/components/sections/about/About-us'
import sanityService from '@/lib/sanityService';

const page = async() => {
  const heroImage = await sanityService.getHeroImageBySlug('about');

  return (
    <>
        <AboutPage heroImage = {heroImage}/>
    </>
  )
}

export default page