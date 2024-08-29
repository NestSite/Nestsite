import React from 'react'
import LayoutEffect from '../layoutEffect'
const CTA = () => {
  return (
    
    <LayoutEffect
    className="duration-1000 delay-300"
    isInviewState={{
        trueState: "opacity-1",
        falseState: "opacity-0 translate-y-6"
    }}
>
    <div >
     
           <section className="rounded-3xl py-28 bg-[#f8f8fa]">
            <div className="container flex flex-col items-center px-4 mx-auto text-center">
                <div className="max-w-2xl space-y-3 md:mx-auto">
                    {/**<h3 className="text-primary font-semibold"> 
                    </h3> */}
                    <p className="text-black text-3xl lg:text-4xl font-semibold">
                        What is Nestsite ?
                    </p>
                    <p className="max-w-4xl text-gray-500 text-center ">
                    A platform for creatives. Nestsite is helping creators make a living by offering them simple tools to create a portfolio site that enables them to curate and share their favourite links, content, portfolios and receive payments from their audience worldwide, create storefronts, masterclass, events and bookings.
                    </p>
                </div>
                <div className="mt-4 inline-flex w-full mt-6 sm:w-auto">
                    <a href="https://nestsite-app.vercel.app/auth/signup" className="inline-flex items-center justify-center w-full py-2 px-4 text-white font-medium duration-150 hover:bg-gray-700 active:bg-gray-900 rounded-lg shadow-md hover:shadow-none bg-black ">
                        Get started <span aria-hidden="true">&nbsp;→</span>
                    </a>
                </div>
            </div>
        </section>
     {/**style={{background:"#1b044a"}} */}
    </div>

    
    </LayoutEffect>
  )
}

export default CTA

