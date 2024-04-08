'use client'
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'react-toastify';
function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const handleSubmit = async (e : any) => {
    e.preventDefault();

    // Validation for username and password format
    if (!username || !password) {
      setError('Vui lòng nhập tên người dùng và mật khẩu.');
      return;
    }

    // Send login request to the server
    const response = await fetch('http://localhost:4041/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      // Redirect to home page or dashboard upon successful login

      const data = await response.json();
      console.log(data);
      router.push(`/chat/${data.user.userId}`);
    } else {
      // Handle login error
      setError('Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin đăng nhập.');
    }
  };
  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
  <div className="lg:p-36 md:p-52 sm:20 p-6 w-full lg:w-1/2 ">
    <h1 className="text-2xl font-semibold mb-4">Login</h1>
    <form onSubmit={handleSubmit}>
      {error && <div className="bg-lighter text-center text-red-600">{error} </div>}
      {/* Username Input */}
      <div className="mb-4">
        <label htmlFor="username" className="block text-gray-600">Username</label>
        <input value={username}
        onChange={(e) => setUsername(e.target.value)} type="text" id="username" name="username" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autoComplete="off" />
      </div>
      {/* Password Input */}
      <div className="mb-4">
        <label htmlFor="password" className="block text-gray-600">Password</label>
        <input value={password}
        onChange={(e) => setPassword(e.target.value)}type="password" id="password" name="password" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autoComplete="off" />
      </div>
      {/* Login Button */}
      <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full">Login</button>
    </form>
    {/* Sign up  Link */}
    <div className="mt-6 text-blue-500 text-center">
      <Link href="../signup" className="hover:underline">Sign up Here</Link>
    </div>
  </div>
</div>

  );
}

export default Login