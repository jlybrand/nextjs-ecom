import { useState, useRef } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Header from "./Header";

async function createUser(email, password) {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }

  return data;
}

function AuthForm() {
  const [registered, setRegistered] = useState(false);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  async function submitHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // TODO: Add validation here

    if (isLogin) {
      await signIn("credentials", {
        redirect: "/",
        email: enteredEmail,
        password: enteredPassword,
      });
    } else {
      try {
        const result = await createUser(enteredEmail, enteredPassword);
        setRegistered(true);
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div className="bg-gray-300 h-screen">
      <section className="max-w-xl mx-auto my-7">
        {!registered ? (
          <>
            <form
              className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
              onSubmit={submitHandler}
            >
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="email"
                  id="email"
                  required
                  ref={emailInputRef}
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  type="password"
                  id="password"
                  required
                  ref={passwordInputRef}
                />
              </div>
              <div className="my-5 flex flex-col max-sm:space-y-7 sm:flex-row items-center justify-between">
                <button className="add-button px-4">
                  {isLogin ? "Sign In" : "Create Account"}
                </button>
                <button type="button" onClick={switchAuthModeHandler}>
                  {isLogin ? "Create Account" : "Already a user? Login"}
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="">
            <p>You have successfully registered!</p>

            <button
              onClick={() => router.reload()}
              className="button button-color"
            >
              Sign In Now
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

export default AuthForm;
