import { Features } from '@/lib/types'
import { Award, Building, Leaf, Phone } from 'lucide-react'

export const features: Features[] = [
    { 
      icon: Award, 
      title: 'Project Management', 
      desc: 'We take pride in delivering complex projects with clarity, control, and confidence. Our project management team ensures seamless coordination between stakeholders, consultants, and contractors. With a strong focus on timelines, budgets, and quality assurance, we oversee every detail to guarantee timely delivery without compromising on excellence. ' 
    },
    { 
      icon: Building, 
      title: 'Project Development & Consultancy', 
      desc: 'Every successful project begins with a clear vision and strategic planning. Our development and consultancy services are designed to turn ideas into viable, future-ready projects. From site evaluation and feasibility studies to design consultancy, master planning, and market positioning.' 
    },
    { 
      icon: Leaf, 
      title: 'Engineering & Construction', 
      desc: 'At the heart of our operations lies our engineering and construction excellence. With a strong focus on innovation, safety, and quality, we transform visionary designs into enduring structures. ' 
    },
    { 
      icon: Phone, 
      title: 'Asset Management', 
      desc: 'Our responsibility doesn’t end at project delivery  it evolves into long-term value creation. Through strategic asset management, we help clients and investors maximize returns, optimize operations, and enhance the lifecycle of their real estate assets.' 
    }
  ]