// components/PortableTextComponents.tsx
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'
import { PortableTextComponents } from '@portabletext/react'
import { AnimatedH1, AnimatedH2, AnimatedH3, AnimatedH4, AnimatedP } from './text-animations'

export const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null
      }
      
      return (
        <div className="my-8">
          <Image
            src={urlFor(value).width(800).height(600).url()}
            alt={value.alt || 'Blog image'}
            width={800}
            height={600}
            className="rounded-lg w-full h-auto"
          />
          {value.caption && (
            <AnimatedP className="text-sm text-gray-600 mt-2 text-center italic">
              {value.caption}
            </AnimatedP>
          )}
        </div>
      )
    },
  },
  block: {
    h1: ({ children }) => <AnimatedH1 wordByWord={true} duration={0.6} className="text-4xl font-bold mb-6 mt-8">{children}</AnimatedH1>,
    h2: ({ children }) => <AnimatedH2 wordByWord={true} duration={0.6} className="text-3xl font-bold mb-4 mt-6">{children}</AnimatedH2>,
    h3: ({ children }) => <AnimatedH3 wordByWord={true} duration={0.6} className="text-2xl font-bold mb-4 mt-6">{children}</AnimatedH3>,
    h4: ({ children }) => <AnimatedH4 className="text-xl font-bold mb-3 mt-4">{children}</AnimatedH4>,
    normal: ({ children }) => <AnimatedP className="mb-4 leading-relaxed">{children}</AnimatedP>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 italic my-6">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-6 mb-4 space-y-2">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-6 mb-4 space-y-2">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
        {children}
      </code>
    ),
    link: ({ children, value }) => (
      <a
        href={value?.href}
        className="text-blue-600 hover:text-blue-800 underline"
        target={value?.href?.startsWith('http') ? '_blank' : '_self'}
        rel={value?.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    ),
  },
}