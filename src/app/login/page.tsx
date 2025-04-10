// "use client";

// import { useState } from "react";
// import { FaGoogle } from "react-icons/fa";
// import { AxiosError } from 'axios';
// import { LoginInstance } from "@/services/login.service";
// import { handleError } from "@/utils/helpers";
// import { useRouter } from "next/navigation";
// import Image from 'next/image';

// export default function LoginPage() {
//   const [inputs, setInputs] = useState({ email: '', password: '' });
//   const router = useRouter();

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const error = validate();
//     if (error) {
//       return;
//     }
//     try {
//       const loginResponse = await LoginInstance.getLoginResponse(inputs);
//       // const { token, user: { role } } = loginResponse;
//       // localStorage.setItem("authData", JSON.stringify({ token, role }));
//       if (typeof window !== "undefined") {
//         // Store in localStorage for client-side use
//         localStorage.setItem(
//           "authData",
//           JSON.stringify({ token: loginResponse.token, role: loginResponse.user.role, department:loginResponse.user.department, isDeleted:loginResponse.user.isDeleted })
//         );
//       }

//       // Store in cookies via API call for middleware use
//       await fetch("/api/auth", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ token: loginResponse.token }),
//         credentials: "include", // Ensure cookies are sent with the request
//       });
//       router.push("/dashboard/home");
//     } catch (error) {
//       handleError(error as AxiosError,true);
//     }
//   };

//   const validate = () => {
//     if (!inputs.email) return 'Email is required';
//     if (!inputs.email.includes('@')) return 'Invalid email';
//     if (!inputs.password) return 'Password is required';
//     return null;
//   };

//   return (
//     <div className="flex justify-center items-center w-full h-screen relative inset-0 z-0" style={{
//           background: 'linear-gradient(to top, #ca9ff5,#8b28ed, #3B82F6)',
//         }}>
//       <div
//         className="absolute inset-0 z-10"
//         style={{
//           backgroundImage: 'url(loginbg.svg)',
//           backgroundRepeat: 'no-repeat',
//           backgroundSize: 'auto',
//           backgroundPosition: 'right top',
//         }}
//       ></div>
//       {/* Login Container */}
//       <div className="absolute top-1/2 right-[5%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center p-8 w-full max-w-sm rounded-lg shadow-lg backdrop-blur-md bg-white/10 z-20">

//         {/* <h2 className="text-white text-2xl font-bold mb-6">IntelliClick</h2> */}
//         <div className="hidden md:flex justify-center h-full items-center">
//           <Image src="/logox.svg" alt="logo" priority width={250} height={60} className="h-full" />
//         </div>
//         <form onSubmit={handleLogin} className="w-full">
//           <div className="mb-4">
//             <label className="text-white block text-sm mb-1">Email</label>
//             <input
//               type="email"
//               className="w-full px-4 py-2 rounded-lg bg-white text-gray-900 outline-none"
//               placeholder="Enter your email"
//               value={inputs.email}
//               onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label className="text-white block text-sm mb-1">Password</label>
//             <input
//               type="password"
//               className="w-full px-4 py-2 rounded-lg bg-white text-gray-900 outline-none"
//               placeholder="Password"
//               value={inputs.password}
//               onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
//               required
//             />
//           </div>

//           <div className="text-right text-sm mb-4">
//             <a href="#" className="text-white hover:underline">
//               Forgot Password?
//             </a>
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 rounded-lg"
//           >
//             Sign in
//           </button>

//           <div className="text-center my-4 text-white text-sm">or continue with</div>

//           <button className="w-full flex items-center justify-center bg-white text-gray-700 font-semibold py-2 rounded-lg hover:bg-gray-200">
//             <FaGoogle className="mr-2" /> Sign in with Google
//           </button>

//           <p className="text-center text-white text-sm mt-4">
//             Don&apos;t have an account?{" "}
//             <a href="#" className="text-blue-300 hover:underline">
//               Register for free
//             </a>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useState } from "react";
// import { FaGoogle } from "react-icons/fa";
// import { AxiosError } from 'axios';
// import { LoginInstance } from "@/services/login.service";
// import { handleError } from "@/utils/helpers";
// import { useRouter } from "next/navigation";
// import Image from 'next/image';

// export default function LoginPage() {
//   const [inputs, setInputs] = useState({ email: '', password: '' });
//   const router = useRouter();

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const error = validate();
//     if (error) return;

//     try {
//       const loginResponse = await LoginInstance.getLoginResponse(inputs);

//       if (typeof window !== "undefined") {
//         localStorage.setItem(
//           "authData",
//           JSON.stringify({
//             token: loginResponse.token,
//             role: loginResponse.user.role,
//             department: loginResponse.user.department,
//             isDeleted: loginResponse.user.isDeleted
//           })
//         );
//       }

//       await fetch("/api/auth", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ token: loginResponse.token }),
//         credentials: "include",
//       });

//       router.push("/dashboard/home");
//     } catch (error) {
//       handleError(error as AxiosError, true);
//     }
//   };

//   const validate = () => {
//     if (!inputs.email) return 'Email is required';
//     if (!inputs.email.includes('@')) return 'Invalid email';
//     if (!inputs.password) return 'Password is required';
//     return null;
//   };

//   return (
//     <div className="relative flex justify-center items-center min-h-screen w-full bg-gradient-to-t from-[#ca9ff5] via-[#8b28ed] to-[#3B82F6] overflow-hidden">
      
//   <div className="absolute top-0 right-0 w-full h-full z-0 pointer-events-none">
//     <Image
//       src="/loginbg.svg"
//       alt="Login Background"
//       fill
//       className="object-contain object-[right_top] opacity-90"
//       priority
//     />
//   </div>


//       {/* Login Container */}
//       <div className="relative z-10 w-full max-w-md mx-auto p-6 mx-4 sm:p-8 bg-white/10 backdrop-blur-md rounded-xl shadow-lg">
//         <div className="flex justify-center mb-6">
//           <Image
//             src="/logox.svg"
//             alt="logo"
//             priority
//             width={200}
//             height={50}
//             className="h-auto w-auto object-contain"
//           />
//         </div>

//         <form onSubmit={handleLogin} className="w-full">
//           <div className="mb-4">
//             <label className="text-white block text-sm mb-1">Email</label>
//             <input
//               type="email"
//               className="w-full px-4 py-2 rounded-lg bg-white text-gray-900 outline-none"
//               placeholder="Enter your email"
//               value={inputs.email}
//               onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label className="text-white block text-sm mb-1">Password</label>
//             <input
//               type="password"
//               className="w-full px-4 py-2 rounded-lg bg-white text-gray-900 outline-none"
//               placeholder="Password"
//               value={inputs.password}
//               onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
//               required
//             />
//           </div>

//           <div className="text-right text-sm mb-4">
//             <a href="#" className="text-white hover:underline">
//               Forgot Password?
//             </a>
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 rounded-lg"
//           >
//             Sign in
//           </button>

//           <div className="text-center my-4 text-white text-sm">or continue with</div>

//           <button
//             type="button"
//             className="w-full flex items-center justify-center bg-white text-gray-700 font-semibold py-2 rounded-lg hover:bg-gray-200"
//           >
//             <FaGoogle className="mr-2" /> Sign in with Google
//           </button>

//           <p className="text-center text-white text-sm mt-4">
//             Don&apos;t have an account?{" "}
//             <a href="#" className="text-blue-300 hover:underline">
//               Register for free
//             </a>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { AxiosError } from "axios";
import { LoginInstance } from "@/services/login.service";
import { handleError } from "@/utils/helpers";
import { useRouter } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";
import IntelliClickLogo from "@/components/SvgLogo";

const colors = [
  "text-white",
  // "text-purple-600",
  // "text-blue-700",
  // "text-red-500",
  // "text-green-500",
  // "bg-gradient-to-r from-pink-500 via-yellow-500 to-blue-500 text-transparent bg-clip-text",
  // "bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text",
  // "bg-gradient-to-l from-green-400 via-cyan-500 to-blue-500 text-transparent bg-clip-text",
  // "[&>*:nth-child(1)]:text-red-500 [&>*:nth-child(2)]:text-blue-500 [&>*:nth-child(3)]:text-yellow-500",
  // "[&>*:nth-child(1)]:text-purple-500 [&>*:nth-child(2)]:text-green-500"
];

export default function LoginPage() {
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const [otp, setOtp] = useState("");
  const [isOtpStage, setIsOtpStage] = useState(false);
  const [tempToken, setTempToken] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();

  // const handleLogin = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   const error = validate();
  //   if (error) return;

  //   try {
  //     const loginResponse = await LoginInstance.getLoginResponse(inputs);
  //     console.log("check login response",loginResponse);

  //     if (loginResponse.success && loginResponse.message.includes("OTP sent")) {
  //       console.log("in side");
  //       setTempToken(loginResponse?.tempToken);
  //       setEmail(loginResponse?.email);
  //       setIsOtpStage(true);
  //     }
  //   } catch (error) {
  //     handleError(error as AxiosError, true);
  //   }
  // };

  // const handleOtpSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   try {

  //     const response = await LoginInstance.verifyOtpResponse({email,otp,tempToken});
  //     console.log("response verifry otp",response);

  //     console.log("check data",response);

  //     if (response.message === 'Login successful') {
  //       if (typeof window !== "undefined") {
  //         localStorage.setItem(
  //           "authData",
  //           JSON.stringify({
  //             token: response.token,
  //             role: response.user.role,
  //             department: response.user.department,
  //             isDeleted: response.user.isDeleted,
  //           })
  //         );
  //       }

  //       await fetch("/api/auth", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ token: response.token }),
  //         credentials: "include",
  //       });

  //       router.push("/dashboard/home");
  //     } else {
  //       throw new Error(response.message || "OTP verification failed");
  //     }
  //   } catch (error) {
  //     handleError(error as AxiosError, true);
  //   }
  // };

  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  const error = validate();
  if (error) return;

  try {
    const loginResponse = await toast.promise(
      LoginInstance.getLoginResponse(inputs),
      {
        loading: "Logging in...",
        success: "OTP sent successfully!",
        error: "Login failed. Please try again.",
      }
    );

    console.log("check login response", loginResponse);

    if (loginResponse.success && loginResponse.message.includes("OTP sent")) {
      setTempToken(loginResponse?.tempToken);
      setEmail(loginResponse?.email);
      setIsOtpStage(true);
    }
  } catch (error) {
    handleError(error as AxiosError, true);
  }
};

const handleOtpSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const response = await toast.promise(
      LoginInstance.verifyOtpResponse({ email, otp, tempToken }),
      {
        loading: "Verifying OTP...",
        success: "Login successful!",
        error: "OTP verification failed.",
      }
    );

    console.log("response verify otp", response);

    if (response.message === "Login successful") {
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "authData",
          JSON.stringify({
            token: response.token,
            role: response.user.role,
            department: response.user.department,
            isDeleted: response.user.isDeleted,
          })
        );
      }

      await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: response.token }),
        credentials: "include",
      });

      router.push("/dashboard/home");
    } else {
      throw new Error(response.message || "OTP verification failed");
    }
  } catch (error) {
    handleError(error as AxiosError, true);
  }
};

  const validate = () => {
    if (!inputs.email) return "Email is required";
    if (!inputs.email.includes("@")) return "Invalid email";
    if (!inputs.password) return "Password is required";
    return null;
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen w-full bg-gradient-to-t from-[#ca9ff5] via-[#8b28ed] to-[#3B82F6] overflow-hidden">
      <div className="absolute top-0 right-0 w-full h-full z-0 pointer-events-none">
        <Image
          src="/loginbg.svg"
          alt="Login Background"
          fill
          className="object-contain object-[right_top] opacity-90"
          priority
        />
      </div>

      <div className="relative z-10 w-full max-w-md mx-auto p-6 mx-4 sm:p-8 bg-white/10 backdrop-blur-md rounded-xl shadow-lg">
        <div className="flex justify-center mb-6">
          {/* <Image
            src="/logox.svg"
            alt="logo"
            priority
            width={200}
            height={50}
            className="h-auto w-auto object-contain"
          /> */}

          {colors.map((colorClass, index) => (
            <div key={index} className="flex flex-col items-center space-y-2">
              <IntelliClickLogo className={colorClass} />
            </div>
          ))}
          
        </div>

        {isOtpStage ? (
          <form onSubmit={handleOtpSubmit} className="w-full">
            <div className="mb-4">
              <label className="text-white block text-sm mb-1">Enter OTP</label>
              <input
                type="text"
                className="w-full px-4 py-2 rounded-lg bg-white text-gray-900 outline-none"
                placeholder="Enter OTP sent to your email"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 rounded-lg"
            >
              Verify OTP
            </button>
          </form>
        ) : (
          <form onSubmit={handleLogin} className="w-full">
            <div className="mb-4">
              <label className="text-white block text-sm mb-1">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 rounded-lg bg-white text-gray-900 outline-none"
                placeholder="Enter your email"
                value={inputs.email}
                onChange={(e) =>
                  setInputs({ ...inputs, email: e.target.value })
                }
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
                onChange={(e) =>
                  setInputs({ ...inputs, password: e.target.value })
                }
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

            <div className="text-center my-4 text-white text-sm">
              or continue with
            </div>

            <button
              type="button"
              className="w-full flex items-center justify-center bg-white text-gray-700 font-semibold py-2 rounded-lg hover:bg-gray-200"
            >
              <FaGoogle className="mr-2" /> Sign in with Google
            </button>

            <p className="text-center text-white text-sm mt-4">
              Don&apos;t have an account?{" "}
              <a href="#" className="text-blue-300 hover:underline">
                Register for free
              </a>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}



