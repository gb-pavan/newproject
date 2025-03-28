"use client";

import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { AxiosError } from 'axios';
import { LoginInstance } from "@/services/login.service";
import { handleError } from "@/utils/helpers";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [inputs, setInputs] = useState({ email: '', password: '' });
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const error = validate();
    if (error) {
      return;
    }
    try {
      await LoginInstance.getLoginResponse(inputs)
      // const { token } = response.data;
      // localStorage.setItem("token", token);
      router.push("/dashboard");
    } catch (error) {
      handleError(error as AxiosError,true);
    }
  };

  const validate = () => {
    if (!inputs.email) return 'Email is required';
    if (!inputs.email.includes('@')) return 'Invalid email';
    if (!inputs.password) return 'Password is required';
    return null;
  };

  return (
    <div className="flex justify-center items-center w-full h-screen relative inset-0 z-0" style={{
          background: 'linear-gradient(to top, #ca9ff5,#8b28ed, #3B82F6)',
        }}>
      <div
        className="absolute inset-0 z-10"
        style={{
          backgroundImage: 'url(loginbg.svg)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'auto',
          backgroundPosition: 'right top',
        }}
      ></div>
      {/* Login Container */}
      <div className="absolute top-1/2 left-[15%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center p-8 w-full max-w-sm rounded-lg shadow-lg backdrop-blur-md bg-white/10 z-20">

        <h2 className="text-white text-2xl font-bold mb-6">IntelliClick</h2>
        <form onSubmit={handleLogin} className="w-full">
          <div className="mb-4">
            <label className="text-white block text-sm mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded-lg bg-white text-gray-900 outline-none"
              placeholder="Enter your email"
              value={inputs.email}
              onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
              required
            />
          </div>

          <div className="mb-4">
            <label className="text-white block text-sm mb-1">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded-lg bg-white text-gray-900 outline-none"
              placeholder="Password"
              value={inputs.password}
              onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
              required
            />
          </div>

          <div className="text-right text-sm mb-4">
            <a href="#" className="text-white hover:underline">
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 rounded-lg"
          >
            Sign in
          </button>

          <div className="text-center my-4 text-white text-sm">or continue with</div>

          <button className="w-full flex items-center justify-center bg-white text-gray-700 font-semibold py-2 rounded-lg hover:bg-gray-200">
            <FaGoogle className="mr-2" /> Sign in with Google
          </button>

          <p className="text-center text-white text-sm mt-4">
            Don&apos;t have an account?{" "}
            <a href="#" className="text-blue-300 hover:underline">
              Register for free
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

