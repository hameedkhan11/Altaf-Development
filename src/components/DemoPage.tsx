"use client";
import { useCallback, useEffect, useState } from 'react';

// Simulate the enhanced hooks (in your app, import from your hooks file)
const useLenisScroll = () => {
  const [currentScroll, setCurrentScroll] = useState(0);
  
  const scrollToElement = useCallback((selector: string) => {
    const element = document.querySelector(selector);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const handleScroll = () => setCurrentScroll(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { scrollToElement, scrollToTop, currentScroll };
};

export default function PremiumScrollDemo() {
  const { scrollToElement, scrollToTop, currentScroll } = useLenisScroll();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = currentScroll / docHeight;
      setScrollProgress(progress);
    };
    
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentScroll]);

  return (
    <div className="relative">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      {/* Navigation */}
      <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-40 bg-white/80 backdrop-blur-md rounded-full px-6 py-3 shadow-lg">
        <div className="flex space-x-4">
          <button
            onClick={() => scrollToElement('#hero')}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
          >
            Hero
          </button>
          <button
            onClick={() => scrollToElement('#about')}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
          >
            About
          </button>
          <button
            onClick={() => scrollToElement('#services')}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
          >
            Services
          </button>
          <button
            onClick={() => scrollToElement('#contact')}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
          >
            Contact
          </button>
        </div>
      </nav>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 w-12 h-12 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 z-40 ${
          currentScroll > 200 ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
        }`}
      >
        ↑
      </button>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 text-center text-white px-6">
          <h1 className="text-6xl md:text-8xl font-light mb-6 tracking-tight">
            Premium
          </h1>
          <h2 className="text-4xl md:text-6xl font-extralight mb-8 text-blue-200">
            Smooth Scroll
          </h2>
          <p className="text-xl md:text-2xl font-light max-w-2xl mx-auto leading-relaxed">
            Experience ultra-smooth scrolling like SID Thailand&apos;s website
          </p>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-32 right-16 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl animate-pulse delay-1000" />
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen bg-gray-50 py-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-5xl font-light mb-8 text-gray-900">
                Ultra Smooth
              </h3>
              <p className="text-lg font-light leading-relaxed text-gray-600 mb-6">
                This demo showcases the premium smooth scrolling experience similar to high-end websites like SID Thailand. 
                The key is in the configuration: slower lerp values, longer durations, and optimized easing functions.
              </p>
              <p className="text-lg font-light leading-relaxed text-gray-600">
                Notice how the scroll feels cinematic and controlled, not rushed or jerky.
              </p>
            </div>
            <div className="bg-white rounded-3xl p-8 shadow-2xl">
              <h4 className="text-2xl font-light mb-4">Key Settings</h4>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Lerp:</span>
                  <span className="font-medium">0.05 (vs 0.1 default)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium">2.0s (vs 1.2s default)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Wheel Multiplier:</span>
                  <span className="font-medium">0.8 (vs 1.0 default)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Easing:</span>
                  <span className="font-medium">Custom exponential</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="min-h-screen bg-gradient-to-b from-white to-gray-100 py-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <h3 className="text-5xl font-light text-center mb-16 text-gray-900">
            Performance Tips
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Hardware Acceleration",
                description: "Use transform: translateZ(0) and backface-visibility: hidden for smoother rendering",
                icon: "⚡"
              },
              {
                title: "Optimized Images",
                description: "Ensure images are properly optimized and use lazy loading for better scroll performance",
                icon: "🖼️"
              },
              {
                title: "CSS Optimizations", 
                description: "Use contain: layout style paint and avoid heavy box-shadows during scroll",
                icon: "🎨"
              }
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-700">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h4 className="text-xl font-medium mb-4 text-gray-900">{item.title}</h4>
                <p className="text-gray-600 font-light leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen bg-gray-900 py-20 flex items-center">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h3 className="text-5xl font-light mb-8 text-white">
            Implementation Ready
          </h3>
          <p className="text-xl font-light leading-relaxed text-gray-300 mb-12">
            Copy the provided LenisProvider, CSS optimizations, and enhanced hooks to achieve this level of smoothness in your Next.js application.
          </p>
          
          <div className="bg-gray-800 rounded-2xl p-8">
            <h4 className="text-2xl font-light mb-6 text-white">Scroll Progress</h4>
            <div className="bg-gray-700 rounded-full h-4 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
                style={{ width: `${scrollProgress * 100}%` }}
              />
            </div>
            <p className="text-gray-400 mt-4 text-sm">
              {Math.round(scrollProgress * 100)}% scrolled
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-12 text-center text-gray-400">
        <p className="font-light">Premium smooth scrolling experience</p>
      </footer>
    </div>
  );
}