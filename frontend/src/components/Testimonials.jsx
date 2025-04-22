import React from 'react'
import { testimonials } from '../constants'
const Testimonials = () => {
  return (
    <div id='testimonial' className='mt-20 tracking-wide'>
        <h2 className='text-3xl sm:text-5xl lg:text-6xl text-center my-10'>What people are saying</h2>
        <div className='flex flex-wrap justify-center'>
            {testimonials.map((testimonial,index)=>(
              <div key={index} className='w-full sm:w-1/2 lg:w-1/3 px-4 py-2'>
                <div className=' bg-neutral-800 rounded-md p-6 text-md border border-neutral-800 font-thin'>
                    <p>{testimonial.text}</p>
                    <div className='flex mt-8 items-start '>
                        <img src={testimonial.image} alt={testimonial.user} className='size-12 mr-6 rounded-full border border-neutral-300'/>
                        <h6>{testimonial.user}</h6>
                    </div>
                </div>
              </div>  
            ))}
        </div>
    </div>
  )
}

export default Testimonials