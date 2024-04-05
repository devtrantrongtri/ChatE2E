import React from 'react'

function Login() {
  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
  <div className="lg:p-36 md:p-52 sm:20 p-6 w-full lg:w-1/2 ">
    <h1 className="text-2xl font-semibold mb-4">Login</h1>
    <form action="#" method="POST">
      {/* Username Input */}
      <div className="mb-4">
        <label htmlFor="username" className="block text-gray-600">Username</label>
        <input type="text" id="username" name="username" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autoComplete="off" />
      </div>
      {/* Password Input */}
      <div className="mb-4">
        <label htmlFor="password" className="block text-gray-600">Password</label>
        <input type="password" id="password" name="password" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autoComplete="off" />
      </div>
      {/* Login Button */}
      <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full">Login</button>
    </form>
    {/* Sign up  Link */}
    <div className="mt-6 text-blue-500 text-center">
      <a href="../signup" className="hover:underline">Sign up Here</a>
    </div>
  </div>
</div>

  );
}

export default Login