import React from 'react'

function SignUp() {
  return (
    <div className="bg-grey-lighter h-screen flex flex-col ">
    <div className="container w-full lg:w-1/2 max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2 ">
    
    <div className="bg-gray-100 px-6 py-8 rounded shadow-md text-black w-full">
      <h1 className="mb-8 text-3xl text-center">Sign up</h1>
      <input type="text" className="block border border-grey-light w-full p-3 rounded mb-4" name="fullname" placeholder="Full Name" />
      <input type="text" className="block border border-grey-light w-full p-3 rounded mb-4" name="email" placeholder="Email" />
      <input type="password" className="block border border-grey-light w-full p-3 rounded mb-4" name="password" placeholder="Password" />
      <input type="password" className="block border border-grey-light w-full p-3 rounded mb-4" name="confirm_password" placeholder="Confirm Password" />
      <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full">Sign Up</button>
    </div>
    {/* to Login */}
    <div className="text-grey-dark mt-6">
      Already have an account? 
      <a className="no-underline border-b border-blue text-blue" href="../login/">
        Log in
      </a>.
    </div>

  </div>
</div>
  )
}

export default SignUp