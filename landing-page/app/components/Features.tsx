"use client"
import React, { useEffect } from 'react';
import {ServerStackIcon, CurrencyDollarIcon, ServerIcon,UserCircleIcon } from '@heroicons/react/20/solid';
import Image from 'next/image';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Screenshot from '../../media/dashboard.png';


const features = [
  {
    name: 'Sign Up in Minutes: ',
    description:
      "Begin by signing up effortlessly. Complete the process in minutes, unlocking a world of convenient financial transactions.",
    icon:UserCircleIcon ,
  },
  {
    name: 'Choose Service: ',
    description: "Select the service you need from a range of options. Whether it's creating a portfolio, building a digital storefront,a masterclass section or bookings page, Nestsite have you covered.",
    icon: ServerStackIcon,
  },
  {
    name: 'Receive Payments: ',
    description: "Seamlessly receive payments from clients around the world.Secure, flexible, and reliable payments made simple so you can focus on what matters most, your business",
    icon: CurrencyDollarIcon,
  },

];

export default function Features() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
    } else {
      controls.start({ opacity: 0, y: 20 });
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 1.9, ease: 'easeOut' }}
      className="overflow-hidden bg-white  sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <h2 className="text-base font-semibold leading-7 text-primary">Discover the simplicity of Nestsite’s seamless process.</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">How It Works</p>
              <p className="mt-6 text-md md:text-md lg:text-lg leading-8 text-gray-600">
              Turn your business idea into reality with NestSite. Our platform provides the tools and support needed to transition seamlessly into the online space. From concept to execution, NestSite has you covered.
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-gray-900">
                      <feature.icon className="absolute left-1 top-1 h-5 w-5 text-primary" aria-hidden="true" />
                      {feature.name}
                    </dt>{' '}
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <Image
            src={Screenshot}
            alt="Product screenshot"
            className="w-[48rem] max-w-none    sm:w-[57rem] md:-ml-4 lg:-ml-0"
            width={2432}
            height={1442}
          />
        </div>
      </div>
    </motion.div>
  );
}
