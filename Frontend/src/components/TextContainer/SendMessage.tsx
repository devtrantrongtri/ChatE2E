import React from 'react'

function SendMessage() {
  return (
      <footer className="bg-black border-t border-gray-300 p-4 absolute bottom-0 w-3/4">
    <div className="flex items-center">
        <input
          type="text"
          placeholder="Type a message..."
          className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
        />
        <button className="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2">
          Send
        </button>
      </div>
      </footer>
  )
}

export default SendMessage