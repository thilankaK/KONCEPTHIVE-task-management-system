// // function Login() {
// //   return (
// //     <div className="min-h-screen flex items-center justify-center">
// //       <h1>Login Page</h1>
// //     </div>
// //   );
// // }

// // export default Login;





// import { Lock, Mail } from "lucide-react";

// function Login() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-blue-100 flex items-center justify-center p-6">
//       <div className="w-full max-w-5xl grid md:grid-cols-2 bg-white rounded-3xl shadow-2xl overflow-hidden">

//         {/* Left Side */}
//         <div className="hidden md:flex flex-col justify-center bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-12">
//           <h1 className="text-4xl font-bold mb-4">
//             Task Management System
//           </h1>

//           <p className="text-blue-100 leading-8">
//             Organize your work, manage tasks efficiently,
//             and stay productive with a modern task management platform.
//           </p>

//           <div className="mt-12">
//             <div className="w-40 h-40 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-6xl">
//               🚀
//             </div>
//           </div>
//         </div>

//         {/* Right Side */}
//         <div className="p-10 md:p-14">

//           <h2 className="text-3xl font-bold text-slate-800">
//             Welcome Back 👋
//           </h2>

//           <p className="text-slate-500 mt-2 mb-8">
//             Sign in to continue
//           </p>

//           <form className="space-y-6">

//             <div>
//               <label className="text-sm font-medium text-slate-700">
//                 Email
//               </label>

//               <div className="mt-2 flex items-center border rounded-xl px-4 py-3">
//                 <Mail className="w-5 h-5 text-slate-400 mr-3" />

//                 <input
//                   type="email"
//                   placeholder="admin@test.com"
//                   className="w-full outline-none"
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="text-sm font-medium text-slate-700">
//                 Password
//               </label>

//               <div className="mt-2 flex items-center border rounded-xl px-4 py-3">
//                 <Lock className="w-5 h-5 text-slate-400 mr-3" />

//                 <input
//                   type="password"
//                   placeholder="********"
//                   className="w-full outline-none"
//                 />
//               </div>
//             </div>

//             <button
//               className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-xl font-semibold"
//             >
//               Sign In
//             </button>

//           </form>

//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;





import { useState } from "react";
import type { FormEvent } from "react";
import { Eye, EyeOff, LoaderCircle, Lock, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { loginUser } from "../api/auth.api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("admin@test.com");
  const [password, setPassword] = useState("123456");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error("Email and password are required.");
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await loginUser({
        email: email.trim(),
        password,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      toast.success("Login successful.");
      navigate("/dashboard");
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        "Unable to sign in. Please try again.";

      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-100 via-white to-blue-100 p-6">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl md:grid-cols-2">
        <div className="hidden flex-col justify-center bg-gradient-to-br from-blue-600 to-indigo-700 p-12 text-white md:flex">
          <h1 className="mb-4 text-4xl font-bold">
            Task Management System
          </h1>

          <p className="leading-8 text-blue-100">
            Organize your work, manage tasks efficiently, and stay
            productive with a modern task management platform.
          </p>

          <div className="mt-12 flex h-40 w-40 items-center justify-center rounded-full bg-white/10 text-6xl backdrop-blur-md">
            🚀
          </div>
        </div>

        <div className="p-10 md:p-14">
          <h2 className="text-3xl font-bold text-slate-800">
            Welcome Back 👋
          </h2>

          <p className="mb-8 mt-2 text-slate-500">
            Sign in to continue
          </p>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium text-slate-700"
              >
                Email
              </label>

              <div className="mt-2 flex items-center rounded-xl border border-slate-200 px-4 py-3 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
                <Mail className="mr-3 h-5 w-5 text-slate-400" />

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="admin@test.com"
                  autoComplete="email"
                  className="w-full bg-transparent outline-none"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="text-sm font-medium text-slate-700"
              >
                Password
              </label>

              <div className="mt-2 flex items-center rounded-xl border border-slate-200 px-4 py-3 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
                <Lock className="mr-3 h-5 w-5 text-slate-400" />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className="w-full bg-transparent outline-none"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((current) => !current)
                  }
                  className="ml-3 text-slate-400 transition hover:text-slate-600"
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full items-center justify-center rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="mt-8 rounded-xl bg-slate-50 p-4 text-sm text-slate-500">
            <p>
              <span className="font-medium text-slate-700">Email:</span>{" "}
              admin@test.com
            </p>
            <p className="mt-1">
              <span className="font-medium text-slate-700">
                Password:
              </span>{" "}
              123456
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;