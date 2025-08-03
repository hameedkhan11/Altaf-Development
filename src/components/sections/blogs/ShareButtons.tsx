/*
@eslint-disable @typescript-eslint/no-explicit-any
*/
// components/blog/ShareButtons.tsx
'use client';
import { useState } from 'react';
import { Share2, Twitter, Linkedin, Facebook, Link, Check } from 'lucide-react';

interface ShareButtonsProps {
  url: string;
  title: string;
  // description: string;
}

export default function ShareButtons({ url, title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
        <Share2 className="h-5 w-5 mr-2" />
        Share this post
      </h3>
      
      <div className="flex space-x-4">
        <a
          href={shareUrls.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          <Twitter className="h-4 w-4" />
          <span>Twitter</span>
        </a>
        
        <a
          href={shareUrls.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition-colors"
        >
          <Linkedin className="h-4 w-4" />
          <span>LinkedIn</span>
        </a>
        
        <a
          href={shareUrls.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          <Facebook className="h-4 w-4" />
          <span>Facebook</span>
        </a>
        
        <button
          onClick={copyToClipboard}
          aria-label='Copy Link'
          className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
        >
          {copied ? <Check className="h-4 w-4" /> : <Link className="h-4 w-4" />}
          <span>{copied ? 'Copied!' : 'Copy Link'}</span>
        </button>
      </div>
    </div>
  );
}