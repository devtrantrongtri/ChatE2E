'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

  
function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const handleSubmit = async (e : any) => {
    e.preventDefault();

    // Validation
    if (!username || !password || !email || !confirmPassword || confirmPassword !== password) {
      setError('Vui lòng nhập đầy đủ và đúng yêu cầu!');
      return;
    }

    // Send sign up request to the server
    const response = await fetch('http://localhost:4041/users/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ username, password ,email}),
    });

    if (response.ok) {
      // Redirect to home page or dashboard upon successful login
      console.log(response)
      router.push('/login')
    } else {
      // Handle login error
      setError('Đăng Ký không thành công. Vui lòng kiểm tra lại thông tin.');
    }
  };

  return (
    <div className="bg-grey-lighter h-screen flex flex-col ">
    <div className="container w-full lg:w-1/2 max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2 ">
    
    <form onSubmit={handleSubmit} className="bg-gray-100 px-6 py-8 rounded shadow-md text-black w-full">
     
      <h1 className="mb-8 text-3xl text-center">Sign up</h1>
      {error && <div className="bg-lighter text-center text-red-600">{error} </div>}
      <input type="text" className="block border border-grey-light w-full p-3 rounded mb-4" name="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
      <input type="text" className="block border border-grey-light w-full p-3 rounded mb-4" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" className="block border border-grey-light w-full p-3 rounded mb-4" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
      <input type="password" className="block border border-grey-light w-full p-3 rounded mb-4" placeholder="Confirm Password"   name="confirm_password" value={confirmPassword} 
  onChange={(e) => setConfirmPassword(e.target.value)}/>
      <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full">Sign Up</button>
    </form>
    {/* to Login */}
    <div className="text-grey-dark mt-6">
      Already have an account? 
      <Link href="../login/" className="no-underline border-b border-blue text-blue" >
        Log in
      </Link>
      .
    </div>

  </div>
</div>
  )
}

export default SignUp