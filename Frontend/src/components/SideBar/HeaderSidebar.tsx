import React from 'react'
import { CiLogout } from 'react-icons/ci'

function HeaderSidebar() {
  return (
    <header className="p-4 border-b border-gray-300 flex justify-between items-center bg-indigo-600 text-white">
            <a href="/login"><CiLogout className='size-10 float float-start relative'/></a>
          <h1 className="text-2xl relative font-semibold">Friends</h1>
          <div className="relative">
          </div>
    </header>
  )
}

export default HeaderSidebar