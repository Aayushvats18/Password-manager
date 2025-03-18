import React from 'react';

const Navbar = () => {
  return (
    <nav className=' bg-slate-900 text-white flex justify-between items-center px-4 py-5 h-14 mx-auto mycontainer'>
       
        <div className = "logo font-bold text-white text-2xl" >
        <span className="text-green-700">  &lt;</span>
            
           <span> Passop</span>
            <span className="text-green-700">OP/ &gt;</span>
            
            </div>
      <ul>
        <li className='flex gap-4'>
            <a className='hover:font-bold' href="home">Home</a>
            <a className='hover:font-bold' href="about">About</a>
            <a className='hover:font-bold' href="contact">Contact</a>
        </li>
      </ul>
     
     
    </nav>
  );
}

export default Navbar;
