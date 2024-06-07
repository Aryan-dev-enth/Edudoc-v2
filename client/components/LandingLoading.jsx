import React from 'react'
import { BarLoader } from 'react-spinners'

const LandingLoading = () => {
  return (
    <div className='w-screen h-screen bg-[#2a0316] absolute top-0 flex justify-center items-center  flex-col gap-2 z-50'>
       <h1 className='animate-bounce text-white text-4xl font-semibold'>Edudoc</h1>
       <BarLoader height={4} width={150} color='white'/>
    </div>
  )
}

export default LandingLoading