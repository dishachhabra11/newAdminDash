import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { notecontext } from "../notecontext";

const Login = () => {
  const { Auth} = useContext(notecontext);
  const {islogin, setislogin}=  Auth;
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const signInResponse = await fetch("http://localhost:8080/user/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      if (!signInResponse.ok) throw new Error("Sign-in response is not ok");

      const signInJson = await signInResponse.json();

      if (signInJson.success) {
        localStorage.setItem("authtoken", signInJson.authtoken);

        // Verify
        const verifyResponse = await fetch("http://localhost:8080/verify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ authtoken: signInJson.authtoken }),
        });

        if (!verifyResponse.ok) throw new Error("Verify response is not ok");

        const verifyJson = await verifyResponse.json();
        if (verifyJson.success) {
          console.log("token varified in login.js ");
          setislogin(true)
          navigate("/");
        } else {
          alert("Token verification failed");
        }
        console.log("value of islogin in login.js after the token has been verified",islogin)

      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white" style={{ textDecoration: "none"}} >
            <div className="h-10 w-10">
              <img className="w-10 h-11 mr-2" src="assets/images/imc.png" alt="logo" />
              {/* <img /> What is this empty <img> tag for? */}
            </div>
            Digital Door
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                Login in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                  <input type="email" value={credentials.email}  onChange={onChange} name="email" id="email"  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter email" required="" />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                  <input type="password" name="password" value={credentials.password} onChange={onChange} id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                     
                    </div>
                   
                  </div>
                  <p className="text-sm font-light text-blue-600 dark:text-gray-400">
                  <a href="#" class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                </p>
                </div>
                <button type="button">hello</button>
                <button type="submit" className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
               
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
