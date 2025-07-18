// components/blog-detail/blogContentData.ts
import { BlogPost } from "@/lib/blogs/types";

export interface BlogContentSection {
  id: string;
  heading: string;
  content: string;
}

export interface BlogContentData {
  introduction: string;
  mainContent: BlogContentSection[];
  conclusion: string;
}

// Blog content data for different posts
export const getBlogContent = (post: BlogPost): BlogContentData => {
  switch (post.id) {
    case "1":
      return {
        introduction:
          "Strategically located with five major access points, including direct links to the Motorway (M-1)(M2), GT Road, and  (FMC),B-17, Faisal Hills offers unparalleled connectivity. This ensures residents enjoy seamless travel to and from the community, making it an ideal location for both living and investment.",

        mainContent: [
          {
            id: "Unmatched Location & Connectivity",
            heading: "Unmatched Location & Connectivity",
            content:
              "Faisal Hills is strategically positioned at the junction of  Islamabad, with multiple access routes including M-1 & M-2 Motorways, Margalla Avenue (Newly Opened), GT Road Direct link to B-17 and FMC sectors This 5 point access advantage not only makes commuting easy but also future-proofs the value of the area. With the opening of Margalla Avenue, reaching F-10   minutes has become a daily reality. Whether you're a working professional, a frequent traveller, or a growing family, the connectivity Faisal Hills offers is second to none.",
          },
          {
            id: "Planned Growth and Massive Infrastructure",
            heading: "Planned Growth and Massive Infrastructure",
            content:
              "Faisal Hills is not growing  it\'s evolving with vision. The scale of infrastructure development is both bold and well-orchestrated. From wide boulevards to zoned commercial and residential sectors, everything is planned to accommodate modern urban needs. Underground electrification, Wide roads and green medians, Modern sewage and drainage systems, Water supply networks already operational, Long-term zoning for healthcare, education, parks, and public utilities This isn\'t just another plot-based society. It\'s a master planned city within a city.",
          },
          {
            id: "Rapid Development Pace",
            heading: "Rapid Development Pace",
            content:
              "Unlike many societies that linger in prolonged phases of \"coming soon,\" Faisal Hills is visibly transforming every month. Multiple blocks are fully developed with families already residing Commercial activity is picking up with shopping plazas, banks, and restaurants Construction of homes and buildings is at an all-time high For buyers who don\'t want to wait years for possession or basic amenities, Faisal Hills offers ready-to-live options and high-yield potential for early investors.",
          },
          {
            id: "Ideal for Families",
            heading: "Ideal for Families",
            content:
              "Faisal Hills is quickly becoming a family-first community. With its secure, peaceful environment away from city noise  yet close enough to the action  it\'s a place where people want to settle down, not just speculate. The master plan includes: Parks and recreational grounds, Schools and upcoming colleges,Jamia Mosques and community centers Future hospital zone and health services Fitness zones, walking tracks, and green belts. It\'s the kind of environment where families thrive  secure, healthy, and balanced.",
          },
        ],

        conclusion:
          "As we look toward the future, Altaf Development continues to innovate and set new standards in luxury real estate. Our commitment to excellence, sustainability, and cutting-edge design ensures that our properties remain valuable investments for generations to come.",
      };

    case "2":
      return {
        introduction:
          "In the evolving real estate landscape of Pakistan, few developments have managed to capture buyer confidence, family appeal, and investment potential quite like Faisal Hills. Situated near the Margalla Hills and connected to the major lifelines of the capital region, Faisal Hills is no longer just a housing society it’s a lifestyle destination and a symbol of smart, future-ready living. But what exactly makes Faisal Hills the first choice for today’s buyers?",

        mainContent: [
          {
            id: "home-automation",
            heading: "Advanced Home Automation Systems",
            content:
              "Our luxury properties feature comprehensive automation systems that control lighting, temperature, security, and entertainment through unified platforms. These systems learn from user behavior to optimize energy consumption while maintaining perfect comfort levels throughout the day.",
          },
          {
            id: "security-privacy",
            heading: "Security and Privacy Enhancement",
            content:
              "State-of-the-art security systems with facial recognition, biometric access, and AI-powered monitoring ensure complete privacy and safety. Smart locks, surveillance cameras, and alarm systems are seamlessly integrated into the home's architecture without compromising aesthetic appeal.",
          },
          {
            id: "energy-management",
            heading: "Energy Management and Efficiency",
            content:
              "Intelligent energy management systems monitor and optimize power consumption across all connected devices. Solar panels, smart thermostats, and automated lighting systems work together to reduce environmental impact while maintaining luxury standards.",
          },
        ],

        conclusion:
          "Smart home technology in luxury properties represents the perfect marriage of convenience, security, and sustainability. Our developments ensure that residents enjoy the ultimate in modern living while maintaining the highest standards of luxury and comfort.",
      };

    case "3":
      return {
        introduction:
          "Sustainable architecture is revolutionizing the luxury real estate landscape. Today\'s discerning buyers seek properties that combine environmental responsibility with uncompromising elegance and comfort.",

        mainContent: [
          {
            id: "green-building-materials",
            heading: "Innovative Green Building Materials",
            content:
              "We utilize cutting-edge sustainable materials including recycled steel, bamboo flooring, and low-VOC paints that maintain air quality while providing durability and aesthetic appeal. These materials are sourced responsibly and contribute to LEED certification standards.",
          },
          {
            id: "renewable-energy",
            heading: "Renewable Energy Integration",
            content:
              "Solar panels, geothermal heating systems, and wind power solutions are seamlessly integrated into our architectural designs. These systems significantly reduce carbon footprint while providing long-term energy cost savings for homeowners.",
          },
          {
            id: "water-conservation",
            heading: "Water Conservation Systems",
            content:
              "Advanced water management includes rainwater harvesting, greywater recycling, and drought-resistant landscaping. These systems reduce water consumption by up to 40% while maintaining lush, beautiful outdoor spaces.",
          },
        ],

        conclusion:
          "Sustainable luxury is not a compromise—it's an enhancement. Our eco-friendly developments prove that environmental responsibility and luxury living can coexist beautifully, creating homes that are both prestigious and planet-friendly.",
      };

    default:
      return {
        introduction:
          "This comprehensive guide explores the latest trends and innovations in luxury real estate, providing insights into what defines premium living in today's market.",

        mainContent: [
          {
            id: "market-dynamics",
            heading: "Market Dynamics and Trends",
            content:
              "The luxury real estate market continues to evolve with changing consumer preferences and economic conditions. Understanding these dynamics is crucial for both investors and homebuyers seeking premium properties.",
          },
          {
            id: "design-excellence",
            heading: "Design and Architecture Excellence",
            content:
              "Contemporary luxury properties showcase innovative architectural designs that blend functionality with aesthetic appeal. From minimalist modern styles to classical elegance, each development tells a unique story.",
          },
          {
            id: "investment-opportunities",
            heading: "Investment Opportunities",
            content:
              "Luxury real estate remains a stable investment option with strong potential for appreciation. Strategic location selection and premium amenities contribute to long-term value growth.",
          },
          {
            id: "High Return on Investment (ROI)",
            heading: "High Return on Investment (ROI)",
            content:
              "Investors are particularly drawn to Faisal Hills due to its early development phase and explosive potential for appreciation. With multiple access roads, government-backed infrastructure around the area, and a surge in population movement from urban centers to suburban communities, plot, apartment  prices and rental value are on a strong upward curve. For both short-term flippers and long-term holders, Faisal Hills presents a golden investment window  especially before upcoming high rise apartment building in Main Boulevard civic centre  downtown, hotel, and hospital zones are fully realized.",
          },
        ],

        conclusion:
          "The luxury real estate sector continues to thrive, driven by innovation, quality, and attention to detail. Altaf Development remains committed to creating exceptional properties that exceed expectations.",
      };
  }
};