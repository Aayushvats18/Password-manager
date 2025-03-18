import React, { useEffect } from 'react';
import {useRef,useState} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';



const Manager = () => {
    const ref=useRef()
    const passwordRef=useRef()
    const [form, setform] = useState({site:"",username:"",password:""})
    const [passwordArray,setPasswordArray] = useState([])
    useEffect(()=>{
      let passwords= localStorage.getItem("passwords")
      
      if(passwords){
   setPasswordArray(JSON.parse(passwords))
      }
     
    },[])
    const copyText = (text) => {
      toast('Copied to clipboard', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        });
      navigator.clipboard.writeText(text);
  };
  
    const showPassword=()=>{
passwordRef.current.type='text'
        alert("show the password");
        if( ref.current.src.includes("src/assets/eyecross.png")){

        
        ref.current.src="src/assets/eye1.png"
        passwordRef.current.type='text'
        }
        else{
            ref.current.src="src/assets/eyecross.png" 
            passwordRef.current.type='password' 
        }
    }
    const savePassword=()=>{
     
     setPasswordArray([...passwordArray,{...form,id: uuidv4()}])
     localStorage.setItem("passwords",JSON.stringify([...passwordArray,{...form,id: uuidv4()}]))
     console.log(...passwordArray,form)
     setform({site:"",username:"",password:""})
     toast('Password Saved!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
      });
    }
    
    const editPassword=(id)=>{
     setform(passwordArray.filter(item=>item.id===id)[0])
      console.log("editing with id", id)
      setPasswordArray(passwordArray.filter(item=>item.id!==id))
      toast('Edit Password', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "Dark",
        transition: Bounce,
        });
    }

    const deletePassword=(id)=>{
      setPasswordArray(passwordArray.filter(item=>item.id!==id))
     console.log("deleting with id", id)
     localStorage.setItem("passwords",JSON.stringify(passwordArray.filter(item=>item.id!==id)))
     let c=confirm("Do you really want to delete this password")
      if(c){
        setPasswordArray(passwordArray.filter(item=>item.id!==id))
        localStorage.setItem("passwords",JSON.stringify(passwordArray.filter(item=>item.id!==id)))
      }
      toast('Delete Password', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        });
     }
     

    const handleChange=(e)=>{
     setform({...form,[e.target.name]: e.target.value})
    }
  return (
    <>
    <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
transition: Bounce

/>
<div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
        <div className="p-2 md:p-0 md: mycontainer min-h-[81vh] "> 
<h1 className='text-4xl font-bold text-center' > 
<span className="text-green-700">  &lt;</span>
              
            <span> Passop</span>
             <span className="text-green-700">OP/ &gt;</span>
</h1>
<p className='text-green-900 text-lg text-center'>Your own password Manager</p>

      <div className="text-white flex flex-col p-4 text-black gap-6 items-center">
        <input value={form.site} onChange={handleChange}  placeholder='Enter website URl' className='rounded-full border border-green-600 text-black w-full py-1 px-4' type="text" name="site" id="site"/>
      
      <div className="flex flex-col md:flex-row w-full justify-between gap-8">
        <input value={form.username} onChange={handleChange} placeholder='Enter UserName' className='rounded-full border border-green-600 text-black w-full py-1 px-4' type="text"  name="username" id="username" />
     
     <div className="relative">
        <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-full border border-green-600 text-black w-full py-1 px-4' type="password"  name="password" id="password" />
        <span className='absolute  right-[1px] top-[1px] cursor-pointer ' onClick={showPassword}>
  
    <img ref={ref} className='p-1.5' width={30} rounded-full src="src/assets/eye1.png" alt="eye" /></span>
    </div>
    </div>
    
     <button onClick={savePassword} className='flex justify-center items-center bg-green-500 hover:bg-green-300 rounded-full px-2 py-2 w-fit border border-black'> <lord-icon
    src="https://cdn.lordicon.com/hqymfzvj.json"
    trigger="hover"></lord-icon> Save Password</button>
      </div>
      <div className="password">
        <h2 className='font-bold text-2xl py-4'>Your passwords</h2>
       { passwordArray.length=== 0 && <div>No passwords to show</div>}
       { passwordArray.length!= 0 && <table className="table-auto w-full rounded-md overflow-hidden">
  <thead className= 'bg-green-800 text-white'>
    <tr>
      <th className='py-2'>Site</th>
      <th className='py-2'>Username</th>
      <th className='py-2'>Passwords</th>
      <th className='py-2'>Actions</th>
    </tr>
  </thead>
  <tbody className='bg-green-200'>
    {passwordArray.map((item)=>{

   
   return <tr>
       <td className='py-2  border border-white text-center min-w-32'><a href={item.site} target='_blank'>{item.site}</a><img
    className='px-2 w-8 cursor-pointer'
    onClick={() => copyText(item.site)}
    src="src/assets/copy.png"
    alt="copy"
/>


       </td>
       <td className='py-2  border border-white text-center min-w-32'>{item.username}<img
    className='px-2 w-8 cursor-pointer'
    onClick={() => copyText(item.username)}
    src="src/assets/copy.png"
    alt="copy"
/>
    </td>
       <td className='py-2  border border-white text-center min-w-32'>{item.password}<img
    className='px-2 w-8 cursor-pointer'
    onClick={() => copyText(item.password)}
    src="src/assets/copy.png"
    alt="copy"
/>
     </td>
     <td className='py-2  border border-white text-center min-w-32'>

      <span className="cursor-pointer mx-2" onClick={()=>{editPassword(item.id)}}>
        <script src="https://cdn.lordicon.com/lordicon.js"></script>
<lord-icon
    src="https://cdn.lordicon.com/exymduqj.json"
    trigger="hover"
    style={{"width":"25px", "height":"25px"}}>
</lord-icon></span>

<span className="cursor-pointer mx-2" onClick={()=>{deletePassword(item.id)}}>
        <script src="https://cdn.lordicon.com/lordicon.js"></script>
<lord-icon
    src="https://cdn.lordicon.com/hwjcdycb.json"
    trigger="hover"
    style={{"width":"25px", "height":"25px"}}>
</lord-icon></span>
     </td>
    </tr>
    }
  )}
  </tbody>
</table>}
      </div>
  </div>
  </>
  );
}

export default Manager;
