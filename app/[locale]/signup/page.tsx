import Link from "next/link";

// Initial state for the form
const initialState = {
  email: "",
  password: "",
  cpassword: "",
  emailError: "",
  passwordError: "",
  termsAccepted: false,
};

function Signup() {
  return (
    <>
      <div className="flex h-screen">
        {/* Signup form */}
        <div className="flex-1 h-full">
          <div className="flex flex-col justify-center h-screen">
            <div className="max-w-md w-full mx-auto rounded-2xl p-8">
              <form>
                <div className="space-y-6">
                  <div className="flex justify-center">
                    <h1 className="text-2xl font-bold text-center">
                      Create an account
                    </h1>
                  </div>
                  <div>
                    <label className="text-muted-foreground text-sm mb-2 block">
                      Email
                    </label>
                    <input
                      type="text"
                      className="text-muted-foreground bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-primary"
                      placeholder="Enter email"
                    />
                  </div>
                  <div>
                    <label className="text-muted-foreground text-sm mb-2 block">
                      Password
                    </label>
                    <input
                      type="password"
                      className="text-muted-foreground bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md focus:outline-primary"
                      placeholder="Enter password"
                    />
                  </div>
                  <div>
                    <label className="text-muted-foreground text-sm mb-2 block">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-primary"
                      placeholder="Enter confirm password"
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 shrink-0 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                    <label
                      htmlFor="remember-me"
                      className="text-muted-foreground ml-3 block text-sm"
                    >
                      I accept the{" "}
                      <a
                        href="javascript:void(0);"
                        className="text-primary font-semibold hover:underline ml-1"
                      >
                        Terms and Conditions
                      </a>
                    </label>
                  </div>
                </div>
                <div className="mt-6">
                  <button
                    type="submit"
                    className="w-full py-3 px-4 text-sm tracking-wider font-semibold rounded-md text-white bg-primary focus:outline-none"
                  >
                    Create an account
                  </button>
                </div>
                <p className="text-muted-foreground text-sm mt-6 text-center">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="text-primary font-semibold hover:underline ml-1"
                  >
                    Login here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
