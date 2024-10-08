'use client'
import generateKeyKeyAndSaveToIndexDb, { getPublicKeyHex, } from '@/E2E/generateKey';
import { generateKeyGroup } from '@/E2EGroup/generateKey';
import {  testFunction } from '@/Test/testFunction';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

  
function SignUp() {
  // State để lưu trữ các giá trị nhập từ người dùng
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [pubKeyState, setPubKeyState] = useState<any>();
  const [userid, setUserid] = useState<any>();
  // const testButton = () => {
  //   console.log('testButton')
  // }
  // Hook để sử dụng chức năng định tuyến
  const router = useRouter();

  
  // Hàm xử lý khi người dùng nhấn nút đăng ký
  const handleSubmit = async (e: any) => {
    e.preventDefault();

  // Kiểm tra tính hợp lệ của dữ liệu nhập từ người dùng
    if (
      !username ||
      !password ||
      !email ||
      !confirmPassword ||
      confirmPassword !== password
    ) {
      setError("Vui lòng nhập đầy đủ và đúng yêu cầu!");
      return;
    }

    // Gửi yêu cầu đăng ký đến server
    const response = await fetch("http://localhost:4041/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // Bảo đảm gửi cookie của người dùng cùng yêu cầu
      credentials: "include",
      body: JSON.stringify({ username, password, email }),
    });

    if (response.ok) {
      // Chuyển hướng đến trang đăng nhập khi đăng ký thành công
      const data = await response.json();
      setUserid(data.userid);
      generateKeyKeyAndSaveToIndexDb(data.hashPassword,data.username);
      const pubKeyUnit8Array =await getPublicKeyHex(data.username,data.hashPassword); 
      console.log("pubunit8",pubKeyUnit8Array)
      const BufferPublicKey = Array.from(pubKeyUnit8Array)
      console.log("BufferPublicKey",BufferPublicKey)
        // Cập nhật publicKey và gửi yêu cầu PATCH
        setPubKeyState(BufferPublicKey);
        console.log("set:", BufferPublicKey);
        // await sendPublicKeyToServer(data.userid);
    } else {
      // Handle login error
      setError("Đăng Ký không thành công. Vui lòng kiểm tra lại thông tin.");
    }
  };
  const sendPublicKeyToServer = async (userId: string) => {
    const resSendPublicKey = await fetch(`http://localhost:4041/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ pubKey: pubKeyState }),
    });
  
    if (resSendPublicKey.ok) {
      const responseData = await resSendPublicKey.json();
      console.log("Response data:", responseData);

      // const testgenerateGroup =await generateKeyGroup(responseData.username);
      // console.log("testgenerateGroup :",testgenerateGroup)

      // router.push("/login"); // nhớ mở lại
    } else {
      setError("Có lỗi gì đó ở server. Vui lòng báo cho admin.");
    }
  };
  useEffect(() => {
    if (pubKeyState && userid) {
      console.log("set:", pubKeyState);
      sendPublicKeyToServer(userid);
    }
  }, [pubKeyState, userid]);


  
  // console.log("UserId:", userid);







  
  return (
    <div className="bg-slate-900 h-screen flex flex-col ">
    {/* <button className='bg-red-600 text-white' onClick={() => generateSharedKey()}>onclick</button>
    <button className='bg-white text-black' onClick={() => testExample()}>onclick</button> */}

      <div className="container w-full lg:w-1/2 max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2 ">
        <form
          onSubmit={handleSubmit}
          className="bg-slate-800 px-6 py-8 rounded shadow-md text-black w-full"
        >
          <h1 className="mb-8 text-3xl text-gray-400 font-bold text-center">
            Sign up
          </h1>
          {error && (
            <div className="bg-lighter text-center text-red-600">{error} </div>
          )}
          <input
            type="text"
            className="block bg-slate-400  border border-grey-light placeholder:text-white focus:outline-none  w-full p-3 border-gray-300 rounded-md mb-4"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
          <input
            type="text"
            className="block bg-slate-400 border border-grey-light w-full p-3 placeholder:text-white focus:outline-none  border-gray-300 rounded-md mb-4"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="block bg-slate-400 border border-grey-light w-full placeholder:text-white focus:outline-none  p-3 border-gray-300 rounded-md mb-4"
            name="password"
            placeholder="Password"
            autoComplete='newPassword'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            className="block bg-slate-400 border border-grey-light w-full placeholder:text-white focus:outline-none  p-3 border-gray-300 rounded-md mb-4"
            placeholder="Confirm Password"
            name="confirm_password"
            autoComplete='newPassword'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
          >
            Sign Up
          </button>
        </form>
        <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
            onClick={() => testFunction()}
          >
            test E2E
          </button>
        {/* <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
            onClick={() => testD()}
          >
            descript Message
          </button> */}
        {/* to Login */}
        <div className="mt-6 text-blue-500 text-center">
          Already have an account? <span> </span>
          <Link href="../login/" className="hover:underline">
            Log in
          </Link>
          .
        </div>
      </div>
    </div>
  );
}

export default SignUp