"use client"
import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Scrollbar from 'smooth-scrollbar';
import Photogrid from './photogrid'
import Navbar from './navbar'
import { Poppins, Damion } from '@next/font/google';

const poppins = Poppins({
  weight: '400',
  style: ['normal', 'italic'],
  subsets: ['latin'],
});

const damion = Damion({
  weight: '400',
  subsets: ['latin'],
});

gsap.registerPlugin(ScrollTrigger);

function ColorChangeOnScrollGsap() {
  const [textColor, setTextColor] = useState('text-black'); // State to control text color

  useEffect(() => {
    // Initialize smooth-scrollbar
    const scrollBar = Scrollbar.init(document.querySelector('.main'), {
      damping: 0.06,
      delegateTo: document,
      alwaysShowTracks: false,
      speed: 3,
    });




    // Set up ScrollTrigger with smooth-scrollbar
    ScrollTrigger.defaults({
      scroller: '.main',
    });

    ScrollTrigger.scrollerProxy('.main', {
      scrollTop(value) {
        if (arguments.length) {
          scrollBar.scrollTop = value;
        }
        return scrollBar.scrollTop;
      },
    });

    scrollBar.addListener(ScrollTrigger.update);

    // Change background and text color based on scroll position
    const sectionColor = document.querySelectorAll('[data-bgcolor]');
    sectionColor.forEach((colorSection, i) => {
      const prevBgColor = i === 0 ? '' : sectionColor[i - 1].dataset.bgcolor;
      const prevTextColor =
        i === 0 ? '' : sectionColor[i - 1].dataset.textcolor;

      ScrollTrigger.create({
        trigger: colorSection,
        scroller: '.main',
        start: 'top 50%',
        onEnter: () =>
          gsap.to('.main', {
            backgroundColor: colorSection.dataset.bgcolor,
            color: colorSection.dataset.textcolor,
            overwrite: 'auto',
          }),
        onLeaveBack: () =>
          gsap.to('.main', {
            backgroundColor: prevBgColor,
            color: prevTextColor,
            overwrite: 'auto',
          }),
      });
    });

    // Set up the IntersectionObserver for text color changes
    const section = document.querySelector('.scroll-section');

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTextColor('text-white'); // Change to white when the section is in view
        } else {
          setTextColor('text-black'); // Change to black when the section is out of view
        }
      },
      { threshold: 0.5 }
    );

    if (section) {
      observer.observe(section);
    }

    // GSAP ScrollTrigger for text reveal effect
    const revealText = document.querySelectorAll('.reveal-text');

    revealText.forEach((text) => {
      const mask = text.querySelector('.mask');

      gsap.fromTo(
        mask,
        { x: '0%' }, // Mask fully covers text initially
        {
          x: '100%', // Mask slides out to reveal the text
          scrollTrigger: {
            trigger: text,
            scroller: '.main',
            start: 'top 80%', // When 80% of the section is in view
            end: 'top 50%', // Effect continues until 50% of the section is in view
            scrub: 1, // Smooth reveal effect based on scroll position
          },
        }
      );
    });

    // Apply scroll animation to the text inside the scroll-section
    const textElements = document.querySelectorAll('.scroll-section p');

    textElements.forEach((text) => {
      gsap.fromTo(
        text,
        { opacity: 0, y: 50 }, // Starting state (hidden and below)
        {
          opacity: 1,
          y: 0, // End state (visible and in place)
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: text,
            start: 'top 80%', // Start animation when text is 80% in view
            end: 'top 50%', // End animation when text reaches 50% of viewport
            scrub: true, // Smooth animation based on scroll position
            toggleActions: 'play none none reverse', // Animates in and out
          },
        }
      );
    });

    return () => {
      if (section) {
        observer.unobserve(section);
      }
      ScrollTrigger.getAll().forEach(trigger => trigger.kill()); // Clean up ScrollTriggers
      scrollBar.destroy(); // Clean up smooth-scrollbar
    };
  }, []);


  return (
    <div className="main h-screen">
      <section
        className="min-h-screen  flex flex-col items-center justify-start my-10 overflow-x-hidden "
        data-bgcolor="#f3f3f3"
      >

        <div className="flex flex-col w-[90vw] lg:w-[70vw] h-full items-center justify-center gap-16">
          <div className="w-full h-full flex items-center justify-between
                 ">
            <img className='w-[100px] h-[34px]' src="https://cdn.prod.website-files.com/6630ceeee6fd1a867237f62e/6632014a896abef316d6e64d_logo.svg" alt="" />
            <div className="hidden lg:flex gap-6  items-center text-sm ">
              <a href="#" className='font-normal comic-neue text-black'>Features</a>
              <a href="#" className='font-normal comic-neue text-black'>Customers</a>
              <a href="#" className='font-normal comic-neue text-black'>Pricing</a>
              <a href="#" className='font-normal comic-neue text-black'>Centra</a>
              <a href="#" className='font-normal comic-neue text-black'>Sign in</a>
              <button className='py-4 px-5 bg-black text-white rounded-2xl font-normal comic-neue'>Sign up</button>
            </div>
          </div>
          <Photogrid />
        </div>
      </section>



      <section
        className="scroll-section min-h-screen w-screen relative flex items-start justify-center"
        data-bgcolor="#0F0F0F"
        data-textcolor="#fffff"
      >

        <svg viewBox="0 0 2209 1285" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 902.828C239.362 773.243 577.549 743.533 762.445 855.419C947.341 967.305 1137.93 1239.41 753.911 1281.15C369.896 1322.9 840.196 31.4456 2208.43 3" stroke="#FE7C20" stroke-width="4.65737">
          </path></svg>


          <img src="https://awsmd.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fphone-01.9afcffea.png%3Fq%3D90%26fm%3Dwebp&w=640&q=75" alt="" />
        {/* <Navbar /> */}
        {/* <div className={`w-full lg:w-[70vw] text-[9vw] leading-[1.1] tracking-tighter ${textColor}`}>
          <p>Beautiful Pages Convert.</p>
          <p>But They're Tough to Build.</p>
        </div> */}
      </section>

      <section
        className="scroll-section min-h-screen w-screen relative flex items-center justify-center px-32"
        data-bgcolor="#f3f3f3"
      >
        <div className={`w-full lg:w-[70vw] text-[9vw] leading-[1.1] tracking-tighter ${textColor}`}>
          <p className='text'>Beautiful Pages Convert.</p>
          <p className='text'>But They're Tough to Build.</p>
        </div>
      </section>



      {/* <section
        className="min-h-screen w-screen relative flex items-center justify-center px-32"
        data-bgcolor="#3b3825"
        data-textcolor="#c2c1b3"
      >
        <div className="w-full flex items-center justify-around">
          <div>
            <img
              src="https://images.pexels.com/photos/4467879/pexels-photo-4467879.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              alt=""
              className="rounded-3xl"
            />
          </div>
          <div className="w-96 text-5xl">
            Look deep into{' '}
            <span className={`${damion.className} text-green`}>Yourself</span> ,
            and then you will understand everything better.
          </div>
        </div>
      </section>
      <section
        className="min-h-screen w-screen relative "
        data-bgcolor="#032F35"
        data-textcolor="#b3c2ba"
      >
        <div className="w-full flex items-center justify-around">
          <div className={`${poppins.className} w-96 text-5xl`}>
            The best thing one can do when it's raining is{' '}
            <span className={`${damion.className} text-green`}>
              to let it rain.
            </span>{' '}
          </div>
          <div>
            <img
              src="https://images.pexels.com/photos/4791474/pexels-photo-4791474.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              alt=""
              className="rounded-3xl"
            />
          </div>
        </div>
      </section>
      <section
        className="min-h-screen w-screen relative flex items-center justify-center px-32"
        data-bgcolor="#582e1a"
        data-textcolor="#ffffff"
      >
        <div className="w-full  text-[9vw] leading-[1.1] tracking-tighter ">
          <span className={`${poppins.className}`}>End Of Scroll</span>
        </div>
      </section> */}
    </div>
  );
}

export default ColorChangeOnScrollGsap;