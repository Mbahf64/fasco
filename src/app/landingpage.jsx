import React from 'react'
import Photogrid from './photogrid'

const landingpage = () => {
    return (
        <div className='w-full flex items-center justify-center bg-[#f3f3f3] overflow-x-hidden'>
            <div className="w-[90vw] lg:w-[70vw]  flex flex-col mt-5 items-center justify-center gap-6">
                <div className="w-full h-full flex items-center justify-between bg-[#fbfbfb] px-1 py-5 lg:py-[4px]
                rounded-2xl shadow-sm">
                    <img className='w-[100px] h-[34px] pl-2' src="https://cdn.prod.website-files.com/6630ceeee6fd1a867237f62e/6632014a896abef316d6e64d_logo.svg" alt="" />
                    <div className="hidden lg:flex gap-6  items-center text-sm ">
                        <a href="#" className='font-normal comic-neue'>Features</a>
                        <a href="#" className='font-normal comic-neue'>Customers</a>
                        <a href="#" className='font-normal comic-neue'>Pricing</a>
                        <a href="#" className='font-normal comic-neue'>Centra</a>
                        <a href="#" className='font-normal comic-neue'>Sign in</a>
                        <button className='py-4 px-5 bg-black text-white rounded-2xl font-normal comic-neue'>Sign up</button>
                    </div>
                </div>
                <Photogrid />
                {/* <div className="w-full h-[131px] bg-black rounded-[1rem]">
                </div> */}
            </div>
        </div>
    )
}

export default landingpage
