import React from 'react'
import video1 from "../assets/video1.mp4";
import video2 from "../assets/video2.mp4";
import { Link } from 'react-router-dom';
const HeroSection = () => {
  return (
    <div className="flex flex-col items-center mt-6 lg:mt-20">
        <h1 className='text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide'>
        Real-Time Chat<span className='bg-gradient-to-r from-purple-600 to-purple-800 text-transparent bg-clip-text'> Powered by Emotions</span></h1>  
        <p className='mt-10 text-lg text-center text-neutral-500 max-w-4xl'>Go beyond words. Our real-time chat app detects emotions in every message using cutting-edge machine learning models, helping you understand what’s said—and what’s felt.</p>
        
        <div className='flex justify-center my-10'>
            <Link to={'/auth'} className='bg-gradient-to-r from-purple-600 to-purple-900 py-3 px-4 mx-3 rounded-md'>Let's Start
            </Link>
            
        </div>
        <div className='flex mt-10 justify-center'>
            <video autoPlay loop muted className='rounded-lg w-1/2 border border-purple-500 shadow-purple-400 mx-2 my-4'>
            <source src={video1} type='video/mp4'/>
            Your browser does not support the video tag.
            </video>
            <video autoPlay loop muted className='rounded-lg w-1/2 border border-purple-500 shadow-purple-400 mx-2 my-4'>
            <source src={video2} type='video/mp4'/>
            Your browser does not support the video tag.
            </video>
        </div>
    </div>
  )
}

export default HeroSection