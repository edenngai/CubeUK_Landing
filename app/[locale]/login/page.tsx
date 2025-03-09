import Link from "next/link";
import React from "react";
import GoogleLogo from "@/public/google.svg";
import Image from "next/image";

const Login = () => {
  return (
    <>
      <div className="flex h-screen">
        {/* login */}
        <div className="flex-1 h-full">
          <div className="flex flex-col justify-center h-screen">
            <div className="max-w-md w-full mx-auto rounded-2xl p-8">
              <form>
                <div className="space-y-6">
                  <div className="flex justify-center">
                    <h1 className="text-2xl font-bold text-center">Login</h1>
                  </div>
                  <div>
                    <label className="text-muted-background text-sm mb-2 block">
                      Email
                    </label>
                    <input
                      name="email"
                      type="text"
                      className="text-muted-background bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-primary"
                      placeholder="Enter email"
                    />
                  </div>
                  <div>
                    <label className="text-muted-background text-sm mb-2 block">
                      Password
                    </label>
                    <input
                      name="password"
                      type="password"
                      className="text-muted-background bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-primary"
                      placeholder="Enter password"
                    />
                  </div>
                  {/* <div className="flex items-center my-4">
                    <div className="flex-1 border-b border-gray-300"></div>
                    <span className="mx-2 text-muted-background">or</span>
                    <div className="flex-1 border-b border-gray-300"></div>
                  </div>
                  <div>
                    <label className="text-muted-background text-sm mb-2 block"></label>
                    <Link
                      href="https://your-google-authentication-url.com" // Replace with your actual Google login URL
                      className="flex items-center justify-center text-muted-background border border-gray-300 w-full text-sm py-3 px-4 rounded-md text-center transition duration-200 hover:bg-gray-100"
                    >
                      <Image
                        src={GoogleLogo}
                        alt="Google Logo"
                        className="size-4 mr-4"
                      />
                      Continue with Google
                    </Link>
                  </div> */}
                </div>
                <div className="!mt-12">
                  <button
                    type="button"
                    className="w-full py-3 px-4 text-sm tracking-wider font-semibold rounded-md text-white bg-primary focus:outline-none"
                  >
                    Login
                  </button>
                </div>
                <p className="text-muted-background text-sm mt-6 text-center">
                  Don't have an account?{" "}
                  <Link
                    href="/signup"
                    className="text-primary font-semibold hover:underline ml-1"
                  >
                    Signup here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
