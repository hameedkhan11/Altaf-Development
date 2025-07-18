// 'use client'

// import { useState, useEffect } from 'react'

// export function useTheme() {
//   const [isDark, setIsDark] = useState(false)

//   useEffect(() => {
//     // Check for saved theme preference or default to light mode
//     const savedTheme = localStorage.getItem('theme')
//     const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
//     if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
//       setIsDark(true)
//       document.documentElement.classList.add('dark')
//     }
//   }, [])

//   const toggleTheme = () => {
//     setIsDark(!isDark)
//     if (isDark) {
//       document.documentElement.classList.remove('dark')
//       localStorage.setItem('theme', 'light')
//     } else {
//       document.documentElement.classList.add('dark')
//       localStorage.setItem('theme', 'dark')
//     }
//   }

//   return { isDark, toggleTheme }
// }