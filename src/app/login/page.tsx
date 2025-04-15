// "use client";

// import { useState } from "react";
// import { FaGoogle } from "react-icons/fa";
// import { AxiosError } from "axios";
// import { LoginInstance } from "@/services/login.service";
// import { handleError } from "@/utils/helpers";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import toast from "react-hot-toast";
// import IntelliClickLogo from "@/components/SvgLogo";

// const colors = ["text-white"];

// export default function LoginPage() {
//   const [inputs, setInputs] = useState({ email: "", password: "" });
//   const [otp, setOtp] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [isOtpStage, setIsOtpStage] = useState(false);
//   const [isForgotPassword, setIsForgotPassword] = useState(false);
//   const [tempToken, setTempToken] = useState("");
//   const [resetToken, setResetToken] = useState("");
//   const [email, setEmail] = useState("");
//   const router = useRouter();

//   const validate = () => {
//     if (!inputs.email) return "Email is required";
//     if (!inputs.email.includes("@")) return "Invalid email";
//     if (!inputs.password) return "Password is required";
//     return null;
//   };

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const error = validate();
//     if (error) return toast.error(error);

//     try {
//       const loginResponse = await toast.promise(
//         LoginInstance.getLoginResponse(inputs),
//         {
//           loading: "Logging in...",
//           success: "OTP sent successfully!",
//           error: "Login failed. Please try again.",
//         }
//       );

//       if (loginResponse.success && loginResponse.message.includes("OTP sent")) {
//         setTempToken(loginResponse?.tempToken);
//         setEmail(loginResponse?.email);
//         setIsOtpStage(true);
//       }
//     } catch (error) {
//       handleError(error as AxiosError, true);
//     }
//   };

//   const handleForgotPasswordRequest = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!email) return toast.error("Email is required");

//     try {
//       const response = await toast.promise(
//         LoginInstance.forgotPasswordRequest({ email }),
//         {
//           loading: "Requesting OTP...",
//           success: "OTP sent! Please check your email.",
//           error: "Failed to send OTP. Please try again.",
//         }
//       );

//       setTempToken(response.tempToken);
//       setIsOtpStage(true);
//     } catch (error) {
//       handleError(error as AxiosError, true);
//     }
//   };

//   const handlePasswordReset = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!otp) return toast.error("Fill all fields");

//     try {
//       const response = await toast.promise(
//         LoginInstance.verifyForgotPasswordResponse({ email, otp, tempToken }),
//         {
//           loading: "Requesting password reset...",
//           success: "OTP verified! You can now reset your password.",
//           error: "There was a problem verifying the OTP. Please try again.",
//         }
//       );

//       setResetToken(response.resetToken);
//       setIsOtpStage(false);
//     } catch (error) {
//       handleError(error as AxiosError, true);
//     }
//   };

//   const handleOtpSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();

//   try {
//     const response = await toast.promise(
//       LoginInstance.verifyOtpResponse({ email, otp, tempToken }),
//       {
//         loading: "Verifying OTP...",
//         success: "Login successful!",
//         error: "OTP verification failed.",
//       }
//     );

//     console.log("response verify otp", response);

//     if (response.message === "Login successful") {
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

  

//   const handleNewPasswordSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();
//   if (!newPassword) return toast.error("Please enter a new password");

//   try {
//     const response = await toast.promise(
//       LoginInstance.resetPasswordResponse({ newPassword, resetToken }),
//       {
//         loading: "Resetting your password...",
//         success: "Your password has been reset successfully!",
//         error: "Failed to reset your password. Please try again.",
//       }
//     );

//     console.log("Password reset response:", response);

//     setIsForgotPassword(false);
//     setNewPassword("");
//     setInputs({ email: "", password: "" });
//     setResetToken("");
//     // router.push("/login");
//   } catch (error) {
//     handleError(error as AxiosError, true);
//   }
// };


//   return (
//     <div className="relative flex justify-center items-center min-h-screen w-full bg-gradient-to-t from-[#ca9ff5] via-[#8b28ed] to-[#3B82F6] overflow-hidden">
//       <div className="absolute top-0 right-0 w-full h-full z-0 pointer-events-none">
//         <Image
//           src="/loginbg.svg"
//           alt="Login Background"
//           fill
//           className="object-contain object-[right_top] opacity-90"
//           priority
//         />
//       </div>

//       <div className="relative z-10 w-full max-w-md mx-auto p-6 mx-4 sm:p-8 bg-white/10 backdrop-blur-md rounded-xl shadow-lg">
//         <div className="flex justify-center mb-6">
//           {colors.map((colorClass, index) => (
//             <div key={index} className="flex flex-col items-center space-y-2">
//               <IntelliClickLogo className={colorClass} />
//             </div>
//           ))}
//         </div>

//         {/* Forgot Password - New Password Input */}
//         {resetToken ? (
//           <form onSubmit={handleNewPasswordSubmit}>
//             <div className="mb-4">
//               <label className="text-white block text-sm mb-1">New Password</label>
//               <input
//                 type="password"
//                 className="w-full px-4 py-2 rounded-lg bg-white text-gray-900 outline-none"
//                 placeholder="Enter new password"
//                 value={newPassword}
//                 onChange={(e) => setNewPassword(e.target.value)}
//               />
//             </div>
//             <button type="submit" className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 rounded-lg">
//               Reset Password
//             </button>
//           </form>
//         ) : isForgotPassword ? (
//           isOtpStage ? (
//             // <form onSubmit={handlePasswordReset}>
//             //   <div className="mb-4">
//             //     <label className="text-white block text-sm mb-1">Enter OTP</label>
//             //     <input
//             //       type="text"
//             //       className="w-full px-4 py-2 rounded-lg bg-white text-gray-900 outline-none"
//             //       placeholder="Enter OTP sent to your email"
//             //       value={otp}
//             //       onChange={(e) => setOtp(e.target.value)}
//             //     />
//             //   </div>
//             //   <button type="submit" className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 rounded-lg">
//             //     Verify OTP
//             //   </button>
//             // </form>
//             <form onSubmit={handlePasswordReset}>
//   <div className="mb-4">
//     <label className="text-white block text-sm mb-1">Enter OTP</label>
//     <input
//       type="text"
//       className="w-full px-4 py-2 rounded-lg bg-white text-gray-900 outline-none"
//       placeholder="Enter OTP sent to your email"
//       value={otp}
//       onChange={(e) => setOtp(e.target.value)}
//     />
//   </div>

//   <button
//     type="submit"
//     className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 rounded-lg"
//   >
//     Verify OTP
//   </button>

//   <div className="text-center mt-3">
//     <button
//       type="button"
//       onClick={async () => {
//         if (!email) return toast.error("Email missing. Please go back and enter it again.");
//         try {
//           const response = await toast.promise(
//             LoginInstance.resendOtp({ email,tempToken }),
//             {
//               loading: "Resending OTP...",
//               success: "OTP resent! Please check your email.",
//               error: "Failed to resend OTP. Please try again.",
//             }
//           );
//           setTempToken(response.tempToken); // update token with new one
//         } catch (error) {
//           handleError(error as AxiosError, true);
//         }
//       }}
//       className="text-sm text-blue-200 hover:underline mt-2"
//     >
//       Didn't receive the OTP? Resend OTP
//     </button>
//   </div>
// </form>

//           ) : (
//             <form onSubmit={handleForgotPasswordRequest}>
//               <div className="mb-4">
//                 <label className="text-white block text-sm mb-1">Email</label>
//                 <input
//                   type="email"
//                   className="w-full px-4 py-2 rounded-lg bg-white text-gray-900 outline-none"
//                   placeholder="Enter your email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//               </div>
//               <button type="submit" className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 rounded-lg">
//                 Send OTP
//               </button>
//             </form>
//           )
//         ) : isOtpStage ? (
//           <form onSubmit={handleLogin}>
//             {/* OTP flow for login */}
//              <form onSubmit={handleOtpSubmit}>
//               <div className="mb-4">
//                 <label className="text-white block text-sm mb-1">Enter OTP</label>
//                 <input
//                   type="text"
//                   className="w-full px-4 py-2 rounded-lg bg-white text-gray-900 outline-none"
//                   placeholder="Enter OTP sent to your email"
//                   value={otp}
//                   onChange={(e) => setOtp(e.target.value)}
//                 />
//               </div>
//               <button type="submit" className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 rounded-lg">
//                 Send OTP
//               </button>
//             </form>
//           </form>
//         ) : (
//           <form onSubmit={handleLogin}>
//             <div className="mb-4">
//               <label className="text-white block text-sm mb-1">Email</label>
//               <input
//                 type="email"
//                 className="w-full px-4 py-2 rounded-lg bg-white text-gray-900 outline-none"
//                 placeholder="Enter your email"
//                 value={inputs.email}
//                 onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
//                 required
//               />
//             </div>

//             <div className="mb-4">
//               <label className="text-white block text-sm mb-1">Password</label>
//               <input
//                 type="password"
//                 className="w-full px-4 py-2 rounded-lg bg-white text-gray-900 outline-none"
//                 placeholder="Password"
//                 value={inputs.password}
//                 onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
//                 required
//               />
//             </div>

//             <div className="text-right text-sm mb-4">
//               <button
//                 type="button"
//                 className="text-white hover:underline"
//                 onClick={() => {
//                   setIsForgotPassword(true);
//                   setIsOtpStage(false);
//                 }}
//               >
//                 Forgot Password?
//               </button>
//             </div>

//             <button type="submit" className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 rounded-lg">
//               Sign in
//             </button>

//             <div className="text-center my-4 text-white text-sm">or continue with</div>

//             <button
//               type="button"
//               className="w-full flex items-center justify-center bg-white text-gray-700 font-semibold py-2 rounded-lg hover:bg-gray-200"
//             >
//               <FaGoogle className="mr-2" /> Sign in with Google
//             </button>

//             <p className="text-center text-white text-sm mt-4">
//               Don&apos;t have an account?{" "}
//               <a href="#" className="text-blue-300 hover:underline">
//                 Register for free
//               </a>
//             </p>
//           </form>
//         )}
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

const colors = ["text-white"];

export default function LoginPage() {
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isOtpStage, setIsOtpStage] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [tempToken, setTempToken] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();

  const validate = () => {
    if (!inputs.email) return "Email is required";
    if (!inputs.email.includes("@")) return "Invalid email";
    if (!inputs.password) return "Password is required";
    return null;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const error = validate();
    if (error) return toast.error(error);

    try {
      const loginResponse = await toast.promise(
        LoginInstance.getLoginResponse(inputs),
        {
          loading: "Logging in...",
          success: "OTP sent successfully!",
          error: "Login failed. Please try again.",
        }
      );

      if (loginResponse.success && loginResponse.message.includes("OTP sent")) {
        setTempToken(loginResponse?.tempToken);
        setEmail(loginResponse?.email);
        setIsOtpStage(true);
      }
    } catch (error) {
      handleError(error as AxiosError, true);
    }
  };

  const handleForgotPasswordRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return toast.error("Email is required");

    try {
      const response = await toast.promise(
        LoginInstance.forgotPasswordRequest({ email }),
        {
          loading: "Requesting OTP...",
          success: "OTP sent! Please check your email.",
          error: "Failed to send OTP. Please try again.",
        }
      );

      setTempToken(response.tempToken);
      setIsOtpStage(true);
    } catch (error) {
      handleError(error as AxiosError, true);
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) return toast.error("Fill all fields");

    try {
      const response = await toast.promise(
        LoginInstance.verifyForgotPasswordResponse({ email, otp, tempToken }),
        {
          loading: "Requesting password reset...",
          success: "OTP verified! You can now reset your password.",
          error: "There was a problem verifying the OTP. Please try again.",
        }
      );

      setResetToken(response.resetToken);
      setIsOtpStage(false);
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

  // const handleResendOTP = async () => {
  //   // Your custom logic here
  //   console.log("Resending OTP...");
  //   await LoginInstance.resendOtp({email,tempToken});
  // };
  const handleResendOTP = async () => {
    toast.promise(
      LoginInstance.resendOtp({ email, tempToken }),
      {
        loading: "Resending OTP...",
        success: "OTP resent successfully!",
        error: "Failed to resend OTP. Please try again.",
      }
    );
  };

  const handleNewPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword) return toast.error("Please enter a new password");

    try {
      const response = await toast.promise(
        LoginInstance.resetPasswordResponse({ newPassword, resetToken }),
        {
          loading: "Resetting your password...",
          success: "Your password has been reset successfully!",
          error: "Failed to reset your password. Please try again.",
        }
      );

      setIsForgotPassword(false);
      setNewPassword("");
      setInputs({ email: "", password: "" });
      setResetToken("");
    } catch (error) {
      handleError(error as AxiosError, true);
    }
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
          {colors.map((colorClass, index) => (
            <div key={index} className="flex flex-col items-center space-y-2">
              <IntelliClickLogo className={colorClass} />
            </div>
          ))}
        </div>

        {resetToken ? (
          <form onSubmit={handleNewPasswordSubmit}>
            <div className="mb-4">
              <label className="text-white block text-sm mb-1">New Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 rounded-lg bg-white text-gray-900 outline-none"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 rounded-lg">
              Reset Password
            </button>
          </form>
        ) : isForgotPassword ? (
          isOtpStage ? (
            <form onSubmit={handlePasswordReset}>
              <div className="mb-4">
                <label className="text-white block text-sm mb-1">Enter OTP</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-lg bg-white text-gray-900 outline-none"
                    placeholder="Enter OTP sent to your email"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                  <button
                    onClick={handleResendOTP}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                  >
                    Resend OTP
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 rounded-lg"
              >
                Verify OTP
              </button>

              <div className="text-center mt-3">
                <button
                  type="button"
                  onClick={async () => {
                    if (!email) return toast.error("Email missing. Please go back and enter it again.");
                    try {
                      const response = await toast.promise(
                        LoginInstance.resendOtp({ email, tempToken }),
                        {
                          loading: "Resending OTP...",
                          success: "OTP resent! Please check your email.",
                          error: "Failed to resend OTP. Please try again.",
                        }
                      );
                      setTempToken(response.tempToken);
                    } catch (error) {
                      handleError(error as AxiosError, true);
                    }
                  }}
                  className="text-sm text-blue-200 hover:underline mt-2"
                >
                  Didn't receive the OTP? Resend OTP
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleForgotPasswordRequest}>
              <div className="mb-4">
                <label className="text-white block text-sm mb-1">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 rounded-lg bg-white text-gray-900 outline-none"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button type="submit" className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 rounded-lg">
                Send OTP
              </button>
            </form>
          )
        ) : isOtpStage ? (
          <form onSubmit={handleOtpSubmit}>
            <div className="mb-4">
              <label className="text-white block text-sm mb-1">Enter OTP</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg bg-white text-gray-900 outline-none"
                  placeholder="Enter OTP sent to your email"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <button
                  onClick={handleResendOTP}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  Resend OTP
                </button>
              </div>
            </div>
            <button type="submit" className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 rounded-lg">
              Verify OTP
            </button>
          </form>
        ) : (
          <form onSubmit={handleLogin}>
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
              <button
                type="button"
                className="text-white hover:underline"
                onClick={() => {
                  setIsForgotPassword(true);
                  setIsOtpStage(false);
                }}
              >
                Forgot Password?
              </button>
            </div>

            <button type="submit" className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 rounded-lg">
              Sign in
            </button>

            <div className="text-center my-4 text-white text-sm">or continue with</div>

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







