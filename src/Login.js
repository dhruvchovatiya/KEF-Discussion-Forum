import React from 'react'
import logo from './resources/Kotak_Mahindra_Bank_logo.svg'
import { Link } from 'react-router-dom'
import { useState } from 'react'

// import FormikContr


// async function loginUser(credentials) {
//     return fetch('http://localhost:8080/login', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(credentials)
//     })  
//         .then(data => data.json())
// }

async function loginUser(credentials) {
    console.log(credentials);
}


export default function Login() {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
          email,
          password
        });
        // setToken(token);
      }
    

    return (
        <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 my-24">
            <div className="px-6 py-4">
                {/* <h2 className="text-3xl font-bold text-center text-gray-700 dark:text-white">Brand</h2> */}
                <div className="flex justify-center">
                    <img src={logo} className="rounded-full object-contain w-28" />
                </div>
                <h3 className="mt-1 text-xl font-medium text-center text-gray-600 dark:text-gray-200">Welcome</h3>
                <p className="mt-1 text-center text-gray-500 dark:text-gray-400">Login</p>



                <form onSubmit={handleSubmit}>
                    <div className="w-full mt-4">
                        <input required className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" type="email" placeholder="Email Address" aria-label="Email Address" onChange={e => setEmail(e.target.value)}/>
                    </div>
                    <div className="w-full mt-4">
                        <input required className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" type="password" placeholder="Password" aria-label="Password" onChange={e => setPassword(e.target.value)}/>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                        <a href="#" className="text-sm text-gray-600 dark:text-gray-200 hover:text-gray-500">Forgot Password?</a>
                        <button className="px-4 py-2 leading-5 text-white transition-colors duration-200 transform bg-blue-900 rounded hover:bg-blue-500 focus:outline-none" type="submit">
                            Login
                        </button>
                    </div>
                </form>



            </div>
            <div className="flex items-center justify-center py-4 text-center bg-gray-100 dark:bg-gray-700">
                <span className="text-sm text-gray-600 dark:text-gray-200">Don't have an account? </span>
                <Link to='/signup' className="mx-2 text-sm font-bold text-blue-700 dark:text-blue-400 hover:text-blue-500">Register</Link>
            </div>
        </div>

    )
}
