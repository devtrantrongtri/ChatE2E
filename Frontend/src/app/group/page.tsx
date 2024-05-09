'use client'
import CreateGroup from '@/components/Group/CreateGroup';
import HeaderSidebar from '@/components/SideBar/HeaderSidebar';
import React, { useEffect } from 'react'

function Group() {
  useEffect(() => {
    const el = document.getElementById('messages');
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, []);

  const users = [
    { _id: 1, username: 'user1', avatarUrl: 'https://cdn-icons-png.freepik.com/512/33/33308.png?ga=GA1.1.131752735.1714715621' },
    { _id: 2, username: 'user2', avatarUrl: 'https://cdn-icons-png.freepik.com/512/33/33308.png?ga=GA1.1.131752735.1714715621' },
    { _id: 3, username: 'user3', avatarUrl: 'https://cdn-icons-png.freepik.com/512/33/33308.png?ga=GA1.1.131752735.1714715621' },
    { _id: 4, username: 'user4', avatarUrl: 'https://cdn-icons-png.freepik.com/512/33/33308.png?ga=GA1.1.131752735.1714715621' },
    { _id: 5, username: 'user5', avatarUrl: 'https://cdn-icons-png.freepik.com/512/33/33308.png?ga=GA1.1.131752735.1714715621' },
    { _id: 6, username: 'user6', avatarUrl: 'https://cdn-icons-png.freepik.com/512/33/33308.png?ga=GA1.1.131752735.1714715621' },
    { _id: 7, username: 'user7', avatarUrl: 'https://cdn-icons-png.freepik.com/512/33/33308.png?ga=GA1.1.131752735.1714715621' },
    { _id: 8, username: 'user8', avatarUrl: 'https://cdn-icons-png.freepik.com/512/33/33308.png?ga=GA1.1.131752735.1714715621' },
    { _id: 9, username: 'user9', avatarUrl: 'https://cdn-icons-png.freepik.com/512/33/33308.png?ga=GA1.1.131752735.1714715621' },
    { _id: 10, username:'user10',avatarUrl: 'https://cdn-icons-png.freepik.com/512/33/33308.png?ga=GA1.1.131752735.1714715621' }
  ];
  

  const createGroup = (groupData:any) => {
    // This function could make an API call to create a new group
    console.log('Creating group with data:', groupData);

    // gọi API tạo group tại đây.
  };
  return (
    <div className='flex h-screen overflow-hidden'>
      <div className="w-1/4 bg-white border-r border-gray-300">
        {/* Sidebar Header */}
        <HeaderSidebar username={""} userid={'663c3729bc1c8bcb6aa6f4b6'} ></HeaderSidebar>
        <div className='h-2/5'>
          <CreateGroup onCreateGroup={createGroup}></CreateGroup>
        </div>
          <hr />
        {/*Side Bar Contact List */}
        <div className="overflow-y-auto bg-slate-950 h-3/5 p-3 mb-9 pb-20">
          {users.map((user) => (
            <div
              key={user._id}
              typeof="checkbox"
              className={` flex items-center  mb-4 cursor-pointer text-white hover:text-black hover:bg-gray-400 active:bg-gray-50  p-2 rounded-md `}
            >
              <div className="w-12 h-12 rounded-full mr-3 ">
                <img
                  src={
                    user.avatarUrl
                      ? user.avatarUrl
                      : `https://placehold.co/200x/FFFAF0/0A0A0A.svg?text=${user.username
                          .charAt(0)
                          .toUpperCase()}&font=Lato`
                  }
                  alt="User Avatar"
                  className="w-12 h-12 rounded-full bg-white border-4 border-solid border-indigo-500/75"
                />
              </div>
              <div className="flex-1  ">
                <h2 className="text-lg   font-semibold">{user.username}</h2>
                {/* <p className="text-gray-600">**********</p> */}
              </div>
            </div>
          ))}
        </div>
      </div>


{/* chat components */}
<div className="flex-1 p:2 sm:p-6 justify-between flex flex-col h-screen w-3/4 bg-slate-900 border-b">
  <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
    
  <div className="relative flex items-center space-x-4">





{/* avartar và active status và tên nhóm */}
      <div className="relative">
        <span className="absolute text-green-500 right-0 bottom-0">
          <svg width={20} height={20}>
            <circle cx={8} cy={8} r={8} fill="currentColor" />
          </svg>
        </span>
        <img src="https://assetadmin.sgod.vn/images/logos/logo-word.svg" alt="avc" className="w-10 sm:w-16 h-10 sm:h-16 rounded-full" />
      </div>
      
      <div className="flex flex-col leading-tight">
        <div className="text-2xl mt-1 flex items-center">
          <span className="text-white mr-3">Nhóm SGOD </span>
        </div>
        <span className="text-lg text-gray-600">10 người</span>
      </div>
    </div>


    <div className="flex items-center space-x-2">

      {/* thêm người dùng vào nhóm hoặc tham gia nhóm */}
      <button type="button" className="inline-flex items-center justify-center rounded-lg border h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>

      <button type="button" className="inline-flex items-center justify-center rounded-lg border h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      </button>

    </div>
  </div>




{/* tin nhắn ở đây */}
<div id="messages" className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
<div className="chat-message">
    <div className="flex items-end">
      <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
        <div><span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">Can be verified on any platform using docker</span></div>
      </div>
      <img src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144" alt="My profile" className="w-6 h-6 rounded-full order-1" />
    </div>
  </div>
  <div className="chat-message">
    <div className="flex items-end justify-end">
      <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
        <div><span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">Your error message says permission denied, npm global installs must be given root privileges.</span></div>
      </div>
      <img src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144" alt="My profile" className="w-6 h-6 rounded-full order-2" />
    </div>
  </div>
  </div>








  <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
    <div className="relative flex">

      {/* miro */}
      <span className="absolute inset-y-0 flex items-center">
        <button type="button" className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-gray-600">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
        </button>
      </span>

      {/* input tin nhắn */}
      <input type="text" placeholder="Write your message!" className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3" />
      
      
      <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
        
        {/* gửi file */}
        <button type="button" className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-gray-600">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
          </svg>
        </button>

        {/* gửi hình ảnh */}
        <button type="button" className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-gray-600">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>

        {/* emoji */}
        <button type="button" className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-gray-600">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>

        {/* Nút send message */}
        <button type="button" className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none">
          <span className="font-bold">Send</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6 ml-2 transform rotate-90">
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
          </svg>
        </button>

      </div>
    </div>
  </div>
</div>

</div>


  )
}

export default Group



// -------------- chat-message -------------- :
/*

    <div className="chat-message">
      <div className="flex items-end">
        <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
          <div><span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">Can be verified on any platform using docker</span></div>
        </div>
        <img src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144" alt="My profile" className="w-6 h-6 rounded-full order-1" />
      </div>
    </div>
    <div className="chat-message">
      <div className="flex items-end justify-end">
        <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
          <div><span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">Your error message says permission denied, npm global installs must be given root privileges.</span></div>
        </div>
        <img src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144" alt="My profile" className="w-6 h-6 rounded-full order-2" />
      </div>
    </div>
    <div className="chat-message">
      <div className="flex items-end">
        <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
          <div><span className="px-4 py-2 rounded-lg inline-block bg-gray-300 text-gray-600">Command was run with root privileges. I'm sure about that.</span></div>
          <div><span className="px-4 py-2 rounded-lg inline-block bg-gray-300 text-gray-600">I've update the description so it's more obviously now</span></div>
          <div><span className="px-4 py-2 rounded-lg inline-block bg-gray-300 text-gray-600">FYI https://askubuntu.com/a/700266/510172</span></div>
          <div>
            <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">
              Check the line above (it ends with a # so, I'm running it as root )
              <pre># npm install -g @vue/devtools</pre>
            </span>
          </div>
        </div>
        <img src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144" alt="My profile" className="w-6 h-6 rounded-full order-1" />
      </div>
    </div>
    <div className="chat-message">
      <div className="flex items-end justify-end">
        <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
          <div><span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">Any updates on this issue? I'm getting the same error when trying to install devtools. Thanks</span></div>
        </div>
        <img src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144" alt="My profile" className="w-6 h-6 rounded-full order-2" />
      </div>
    </div>
    <div className="chat-message">
      <div className="flex items-end">
        <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
          <div><span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">Thanks for your message David. I thought I'm alone with this issue. Please, ? the issue to support it :)</span></div>
        </div>
        <img src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144" alt="My profile" className="w-6 h-6 rounded-full order-1" />
      </div>
    </div>
    <div className="chat-message">
      <div className="flex items-end justify-end">
        <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
          <div><span className="px-4 py-2 rounded-lg inline-block bg-blue-600 text-white ">Are you using sudo?</span></div>
          <div><span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">Run this command sudo chown -R `whoami` /Users/{'{'}{'{'}your_user_profile{'}'}{'}'}/.npm-global/ then install the package globally without using sudo</span></div>
        </div>
        <img src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144" alt="My profile" className="w-6 h-6 rounded-full order-2" />
      </div>
    </div>
    <div className="chat-message">
      <div className="flex items-end">
        <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
          <div><span className="px-4 py-2 rounded-lg inline-block bg-gray-300 text-gray-600">It seems like you are from Mac OS world. There is no /Users/ folder on linux ?</span></div>
          <div><span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">I have no issue with any other packages installed with root permission globally.</span></div>
        </div>
        <img src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144" alt="My profile" className="w-6 h-6 rounded-full order-1" />
      </div>
    </div>
    <div className="chat-message">
      <div className="flex items-end justify-end">
        <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
          <div><span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">yes, I have a mac. I never had issues with root permission as well, but this helped me to solve the problem</span></div>
        </div>
        <img src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144" alt="My profile" className="w-6 h-6 rounded-full order-2" />
      </div>
    </div>
    <div className="chat-message">
      <div className="flex items-end">
        <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
          <div><span className="px-4 py-2 rounded-lg inline-block bg-gray-300 text-gray-600">I get the same error on Arch Linux (also with sudo)</span></div>
          <div><span className="px-4 py-2 rounded-lg inline-block bg-gray-300 text-gray-600">I also have this issue, Here is what I was doing until now: #1076</span></div>
          <div><span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">even i am facing</span></div>
        </div>
        <img src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144" alt="My profile" className="w-6 h-6 rounded-full order-1" />
      </div>
    </div>

*/