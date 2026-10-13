// Local editorial content supplied by Altaf Developments.
// Article entries are separate from legacy blog posts, which remain in Sanity.
export type ArticleBlock =
  | { type: "heading"; text: string; id: string }
  | { type: "paragraph"; text: string }
  | { type: "image"; src: string; alt: string };

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  coverAlt: string;
  author: string;
  body: ArticleBlock[];
};

export const articles: Article[] = [
  {
    "slug": "altaf-developments-designing-the-future-of-living",
    "title": "Altaf Developments, Designing the Future of Living",
    "excerpt": "Driven by vision, precision and a commitment to better living, Altaf Developments is shaping a new standard for contemporary residential development in Pakistan.",
    "coverImage": "/articles/project-exterior.webp",
    "coverAlt": "The Residences by Altaf Developments, exterior architectural rendering",
    "author": "Altaf Developments",
    "body": [
      {
        "type": "heading",
        "text": "A Vision Beyond Construction",
        "id": "a-vision-beyond-construction"
      },
      {
        "type": "paragraph",
        "text": "Real estate is often measured by what is built. For Altaf Developments, the ambition goes further, toward how people live, connect and experience their homes."
      },
      {
        "type": "paragraph",
        "text": "Founded with a vision of creating thoughtfully planned, high-quality developments, Altaf Developments is emerging as a distinctive name in Pakistan's evolving real-estate landscape. The company's philosophy brings together architectural design, functionality, quality and long-term value to create spaces designed for modern lifestyles."
      },
      {
        "type": "paragraph",
        "text": "Its approach is rooted in a simple principle, development should create more than structures; it should create better experiences."
      },
      {
        "type": "image",
        "src": "/articles/project-exterior.webp",
        "alt": "The Residences architectural exterior rendering"
      },
      {
        "type": "heading",
        "text": "Building With Purpose",
        "id": "building-with-purpose"
      },
      {
        "type": "paragraph",
        "text": "For Altaf Developments, quality begins long before construction."
      },
      {
        "type": "paragraph",
        "text": "Every development starts with decisions about location, planning, architecture, functionality and the people who will eventually occupy the space. This approach brings together real-estate planning, design, project management and a focus on creating environments that respond to the needs of modern families."
      },
      {
        "type": "paragraph",
        "text": "Rather than treating these elements as separate components, Altaf Developments brings them together as part of a larger development philosophy, creating environments where design and practicality work side by side."
      },
      {
        "type": "paragraph",
        "text": "That philosophy is now being brought to life through The Residences, the company's flagship residential development in Faisal Hills."
      },
      {
        "type": "image",
        "src": "/articles/construction-site-2.webp",
        "alt": "Early construction progress at The Residences"
      },
      {
        "type": "heading",
        "text": "The Vision of Altaf Khan",
        "id": "the-vision-of-altaf-khan"
      },
      {
        "type": "paragraph",
        "text": "Behind Altaf Developments is CEO Altaf Khan, whose approach to development is centered on a belief that real estate should contribute to something larger than the structure itself."
      },
      {
        "type": "paragraph",
        "text": "His vision focuses on creating developments that combine purpose, quality and lasting value while keeping the needs of families, homeowners and investors at the center of the process."
      },
      {
        "type": "paragraph",
        "text": "For Altaf Khan, development is not simply a construction exercise. It is an opportunity to influence the way people experience their everyday lives, from the spaces they call home to the communities they become part of."
      },
      {
        "type": "paragraph",
        "text": "This vision is reflected in the company's guiding philosophy:"
      },
      {
        "type": "paragraph",
        "text": "Designing the Future of Living."
      },
      {
        "type": "image",
        "src": "/articles/altaf-khan.webp",
        "alt": "Altaf Khan at the Altaf Developments office"
      },
      {
        "type": "heading",
        "text": "From Vision to Landmark",
        "id": "from-vision-to-landmark"
      },
      {
        "type": "paragraph",
        "text": "A company's philosophy ultimately has to be demonstrated through its projects."
      },
      {
        "type": "paragraph",
        "text": "The Residences represents Altaf Developments’ ambition to introduce a sophisticated vertical residential experience to Faisal Hills. The 24-storey residential development is planned with more than 450 residences, three basement levels and a range of facilities designed around modern contemporary living."
      },
      {
        "type": "paragraph",
        "text": "Located in the Main Boulevard area of Faisal Hills, The Residences has been conceived entirely around residential living, bringing together private residences, lifestyle amenities, security, parking and community spaces within one development."
      },
      {
        "type": "paragraph",
        "text": "With construction underway, the project represents an important transition from vision and planning into physical execution."
      },
      {
        "type": "image",
        "src": "/articles/construction-site-1.webp",
        "alt": "Construction site progress at Faisal Hills"
      },
      {
        "type": "heading",
        "text": "The Residences: Connected to What Matters",
        "id": "the-residences-connected-to-what-matters"
      },
      {
        "type": "paragraph",
        "text": "Location is one of the defining advantages of The Residences."
      },
      {
        "type": "paragraph",
        "text": "Situated in Faisal Hills, the development offers convenient connectivity to some of the region's key destinations and major road networks. With access to the M-1, M-2, GT Road, FMC and B-17, residents can move easily between Islamabad, Rawalpindi and surrounding areas while remaining connected to the wider region."
      },
      {
        "type": "paragraph",
        "text": "The location also places everyday essentials within easy reach, including educational institutions, healthcare, shopping, places of worship and recreational destinations."
      },
      {
        "type": "paragraph",
        "text": "For those travelling further, Islamabad International Airport is also conveniently accessible, adding another layer of connectivity for both local residents and overseas Pakistanis."
      },
      {
        "type": "paragraph",
        "text": "At The Residences, connectivity is not simply about getting from one place to another. It is about being well positioned for the opportunities, experiences and essentials that matter in everyday life."
      },
      {
        "type": "image",
        "src": "/articles/location-map.webp",
        "alt": "Map showing The Residences and surrounding road connectivity"
      },
      {
        "type": "heading",
        "text": "Trust, Transparency and Execution",
        "id": "trust-transparency-and-execution"
      },
      {
        "type": "paragraph",
        "text": "In real estate, vision only matters when it is supported by execution."
      },
      {
        "type": "paragraph",
        "text": "Altaf Developments places strong emphasis on transparency, integrity, expertise and commitment. Its approach is built around careful planning, quality execution and maintaining a clear focus on the expectations of its customers."
      },
      {
        "type": "paragraph",
        "text": "For prospective homeowners and investors, these principles matter because confidence in real estate is ultimately built through clarity, compliance and visible progress."
      },
      {
        "type": "paragraph",
        "text": "The development of The Residences reflects this commitment, moving from concept to construction through a structured process designed to turn an ambitious vision into a tangible residential landmark."
      },
      {
        "type": "image",
        "src": "/articles/noc-approved.webp",
        "alt": "Altaf Developments team celebrating a project milestone"
      },
      {
        "type": "heading",
        "text": "Creating Communities, Not Just Buildings",
        "id": "creating-communities-not-just-buildings"
      },
      {
        "type": "paragraph",
        "text": "The long-term ambition of Altaf Developments extends beyond individual projects."
      },
      {
        "type": "paragraph",
        "text": "A successful residential development is not simply a collection of apartments. It is where families return home, where communities develop, where everyday routines take place and where memories are created over years."
      },
      {
        "type": "paragraph",
        "text": "This perspective changes the way a development is approached."
      },
      {
        "type": "paragraph",
        "text": "For Altaf Developments, the goal is to create environments that combine architecture and functionality with the qualities that make a place feel like home. The emphasis is therefore not only on how a building looks, but on how it performs as a living environment and how it contributes to the community around it."
      },
      {
        "type": "image",
        "src": "/articles/podium-day.webp",
        "alt": "The Residences landscaped podium and amenities rendering"
      },
      {
        "type": "heading",
        "text": "Looking Ahead",
        "id": "looking-ahead"
      },
      {
        "type": "paragraph",
        "text": "As Pakistan's cities continue to evolve, the expectations of modern homeowners are evolving with them."
      },
      {
        "type": "paragraph",
        "text": "People increasingly look beyond four walls. They consider accessibility, security, amenities, privacy, design, community and long-term value when choosing where they want to live."
      },
      {
        "type": "paragraph",
        "text": "Altaf Developments is positioning itself within this changing landscape by pursuing a development philosophy built around innovation, purposeful design and elevated living."
      },
      {
        "type": "paragraph",
        "text": "With The Residences progressing from vision to reality, the company is establishing a defining presence in Faisal Hills while laying the foundation for a broader journey in Pakistan's real-estate sector."
      },
      {
        "type": "paragraph",
        "text": "The journey is still unfolding."
      },
      {
        "type": "paragraph",
        "text": "But the direction is clear."
      },
      {
        "type": "paragraph",
        "text": "Altaf Developments is designing the future of living."
      }
    ]
  }
];

export const getArticleBySlug = (slug: string): Article | undefined =>
  articles.find((article) => article.slug === slug);
