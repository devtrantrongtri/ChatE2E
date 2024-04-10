import Link from 'next/link'
import React from 'react'

function Tittle() {
  return (
      <div className='bg-slate-800'>
        
  <nav>
    <Link href={'/'}>
    <div className ="text-5xl font-extrabold ">
  <span className="p-4 flex justify-center bg-clip-text text-transparent bg-slate-400">
    Chat Encryption 
  </span>
</div>
    </Link>
  </nav>
      </div>

  )
}

export default Tittle