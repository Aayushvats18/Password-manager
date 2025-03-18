import React from 'react';

const Footer = () => {
  return (
    <div className='bg-slate-800  text-white flex flex-col justify-center items-center'>
         <div className = "logo font-bold text-white text-2xl" >
        <span className="text-green-700"> / &lt;</span>
            
           <span> Passop</span>
            <span className="text-green-700">OP/ &gt;</span>
            
            </div>
    <div className='flex  justify-center items-center text-bold '>
      Created with <img className='w-10 mx-2 my-2' src="src/assets/images.png" alt="" /> by Aayush Vats
    </div>
    </div>
  );
}

export default Footer;
