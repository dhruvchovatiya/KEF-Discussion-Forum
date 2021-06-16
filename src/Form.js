import React from 'react'

export default function Form(props) {
    return (
        <section className="w-full max-w-2xl px-6 py-4 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800 my-3">

                <div className="mt-6 ">

                    <div className="w-full mt-4">
                        <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">{'Your '+props.msg+':'}</label>
                        <textarea className="block w-full h-40 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" defaultValue={""} />
                    </div>
                    <div className="flex justify-center mt-6">
                        <button className="px-4 py-2 mx-2 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Upload Image</button>
                        <button className="px-4 py-2 mx-2 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Post</button>

                    </div>
                </div>
            </section>
    )
}
