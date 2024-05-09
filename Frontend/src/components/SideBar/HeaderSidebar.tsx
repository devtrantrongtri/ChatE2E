import { handleLogout } from '@/utils/logout'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { CiLogout } from 'react-icons/ci'
interface PropsChatPage{
  username: string,
  userid:string
}
const HeaderSidebar : React.FC<PropsChatPage> = ({username,userid})=> {
  // setting logot method 
  const pathname = usePathname();
  return (
    <header className="p-4 border-b border-gray-300 flex justify-between items-center bg-slate-700 text-white font-bold">
          <a href="/login" onClick={handleLogout}><CiLogout className='size-10 float float-start relative'/></a>
          {/* <h1 className="text-2xl relative font-semibold">friends {username}</h1> */}
          {pathname === '/group' ? <Link href={`/chat/${userid}`}>Home Chat</Link> : <Link href="/group">Group</Link>}
          <div className="relative">
          </div>
    </header>
  )
}

export default HeaderSidebar
