import { useCallback, useState,useEffect,useRef} from 'react'
import './App.css'

function App() {
  const [length,setlength]=useState(8);
  const [charAllowed,setcharAllowed]=useState(false);
  const [numberAllowed,setnumberAllowed]=useState(false);
  const [Password,setPassword]=useState('');
  const copypass=useRef(null);

  const generatePass=useCallback(()=>{
    let pass='';
    let string='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if(charAllowed){
      string+='!@#$%^&*()_+';
    }
    if(numberAllowed){
      string+="0123456789";
    }
    for (let i = 1; i <= length; i++) {
      let char=Math.floor(Math.random()*string.length+1);
      pass+=string.charAt(char);      
    }
    setPassword(pass);
  },[length,charAllowed,numberAllowed,setPassword]);

 
  const copy=useCallback(()=>{
     copypass.current?.select();
     window.navigator.clipboard.writeText(Password);
  },[Password])

  useEffect(() => {
    generatePass();
  }, [length,charAllowed,numberAllowed,generatePass]);

  return (
    <>
        <div className=' bg-stone-300 h-40 mt-10 max-w-[500px] mx-auto rounded-2xl '>
          <h1 className='text-2xl text-center font-bold mb-2.5'>Password Generator</h1>
          <div className='flex justify-center items-center bg w-full rounded-2xl p-4'>
            <input type='text'
            value={Password}
            placeholder='Password'
            className='bg-white border-2 text-black border-gray-950 outline-amber-300 font-bold text-center p-2 rounded-md  w-full justify-start'
            readOnly></input>
            <button className='bg-green-500 hover:bg-green-600 text-white p-2 rounded-md ml-3' onClick={copy}>copy</button>
          </div>
          <div className='flex justify-start items-center mt-4 ml-3'>
            <div className='flex items-center'>
            <input type='range'
            min={8}
            max={100}
            value={length}
            className='w-full h-2 bg-gray-200 rounded-lg  cursor-pointer dark:bg-gray-700'
            onChange={(e)=>{
              setlength(e.target.value);
            }}></input>
            <span className='ml-2'>Length:{length}</span>  
            </div>
            <div className='flex items-center ml-3'>
              <input type='checkbox'
              checked={charAllowed}
              onChange={(e)=>{
                setcharAllowed((prev)=>!prev);
              }}></input>
              <label className='ml-2 '>Characters</label>
            </div>
            <div className='flex items-center ml-3'>
              <input type='checkbox'
              checked={numberAllowed}
              onChange={(e)=>{
                setnumberAllowed((prev)=>!prev);
              }}></input>
              <label className='ml-2 '>Numbers</label>
            </div>
          </div>
        </div>
    </>
  )
}

export default App
