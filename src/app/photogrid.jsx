import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const photogrid = () => {

    const textRef = useRef(null);
    const marqueeRef = useRef(null);

    useEffect(() => {
        const marquee = marqueeRef.current;
        const phrases = ["Elevate Your Style:", "Define Your Style:", "Own Your Look:"];

        const timeline = gsap.timeline({ repeat: -1, repeatDelay: 1 });
        phrases.forEach((phrase) => {
            timeline
                .to(textRef.current, {
                    opacity: 0,
                    duration: 0.5,
                    onComplete: () => {
                        textRef.current.innerText = phrase; // Update text content
                    },
                })
                .to(textRef.current, { opacity: 1, duration: 0.5 });
        });

        // Clone the logo set for seamless scrolling
        const clone = marquee.innerHTML;
        marquee.innerHTML += clone; // Duplicate the logos

        const totalWidth = marquee.scrollWidth / 2; // Calculate the width of the original set

        // GSAP animation for the marquee
        gsap.to(marquee, {
            x: -totalWidth + 'px',
            duration: 70,
            repeat: -1,
            ease: 'linear',
        });

        // Scale effect on hover
        const logos = marquee.querySelectorAll('img');
        logos.forEach((logo) => {
            logo.addEventListener('mouseenter', () => {
                gsap.to(logo, { scale: 1.2, duration: 0.3 });
            });
            logo.addEventListener('mouseleave', () => {
                gsap.to(logo, { scale: 1, duration: 0.3 });
            });
        });

        return () => {
            logos.forEach((logo) => {
                logo.removeEventListener('mouseenter', () => { });
                logo.removeEventListener('mouseleave', () => { });
            });
        };
    }, []);

    return (
        <div className="w-full h-full flex flex-col items-center gap-[5rem]">
            <div className="w-full  flex flex-col lg:flex-row gap-5 h-full ">
                <div className="lg:w-[45%] lg:h-[60vh] w-full h-full rounded-xl flex flex-col gap-9 justify-between">
                    <div className="w-full max-h-full flex flex-col gap-4 2xl:gap-7">
                        <p className="font-bold text-[40px] lg:text-[44px] 2xl:text-[3.5rem] opensans leading-tight text-black">
                            <span ref={textRef} className="damion text-orange-600">Elevate Your Style:</span> <br />
                            Discover Timeless Fashion for Every Occasion!
                        </p>
                        <p className="2xl:text-[1.5rem] opensans text-black">From elegant staples to bold statement pieces, our curated collections are crafted to help you express your unique style with confidence, no matter the occasion.</p>
                    </div>
                    <div className="w-full flex flex-col lg:flex-row gap-3">
                        <button className='py-5 px-5 bg-orange-600 text-black rounded-2xl font-normal comic-neue'>Try for Free</button>
                        <button className='py-5 px-5 border border-black text-black rounded-2xl font-normal comic-neue'>Free Onboarding</button>
                    </div>
                </div>
                <div className="lg:w-[55%] lg:h-[60vh] w-full max-h-full bg-[#fbfbfb] rounded-xl shadow">
                    <video src="/bg.mp4" autoPlay loop muted
                        className="w-full h-full object-contain rounded-xl px-5"></video>
                </div>
            </div>

            <div className="w-full h-full py-4">
                <div className="overflow-hidden white-space-nowrap mt-5">
                    <div
                        ref={marqueeRef}
                        className="flex space-x-12 animate-marquee "
                    >
                        <img src="/logo (1).svg" alt="Logo 2" className="h-7  " />
                        <img src="/logo (2).svg" alt="Logo 3" className="h-7  " />
                        <img src="/logo (3).svg" alt="Logo 1" className="h-7  " />
                        <img src="/logo (4).svg" alt="Logo 2" className="h-7  " />
                        <img src="/logo.svg"     alt="Logo 1" className="h-7  " />
                        <img src="/logo (1).svg" alt="Logo 2" className="h-7  " />
                        <img src="/logo (2).svg" alt="Logo 3" className="h-7  " />
                        <img src="/logo (3).svg" alt="Logo 1" className="h-7  " />
                        <img src="/logo (4).svg" alt="Logo 2" className="h-7  " />
                    </div>
                </div>
            </div>


        </div>
    )
}

export default photogrid
