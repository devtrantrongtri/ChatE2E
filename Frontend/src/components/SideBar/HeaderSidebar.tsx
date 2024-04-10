import { handleLogout } from '@/utils/logout'
import React from 'react'
import { CiLogout } from 'react-icons/ci'
interface PropsChatPage{
  username: string
}
const HeaderSidebar : React.FC<PropsChatPage> = ({username})=> {
  // setting logot method 
 
  return (
    <header className="p-4 border-b border-gray-300 flex justify-between items-center bg-slate-700 text-white font-bold">
            <a href="/login" onClick={handleLogout}><CiLogout className='size-10 float float-start relative'/></a>
          <h1 className="text-2xl relative font-semibold">friends {username}</h1>
          <div className="relative">
          </div>
    </header>
  )
}

export default HeaderSidebar
