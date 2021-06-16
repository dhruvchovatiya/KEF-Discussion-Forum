import React from 'react'
import CommentCard from './CommentCard'
import Form from './Form'

export default function Thread() {
    return (
        <div>
            <div className="max-w-2xl mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 my-3">
                <img className="object-cover w-full h-64" src="https://images.unsplash.com/photo-1550439062-609e1531270e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="Article" />
                <div className="p-6">
                    <div>
                        <span className="text-xs font-medium text-blue-600 uppercase dark:text-blue-400">Algebra</span>
                        <a href="#" className="block mt-2 text-2xl font-semibold text-gray-800 dark:text-white hover:text-gray-600 hover:underline">Question Title here</a>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie parturient et sem ipsum volutpat vel. Natoque sem et aliquam mauris egestas quam volutpat viverra. In pretium nec senectus erat. Et malesuada lobortis.</p>
                    </div>
                    <div className="mt-4">
                        <div className="flex items-center">
                            <div className="flex items-center">
                                <img className="object-cover h-10 rounded-full" src="https://images.unsplash.com/photo-1586287011575-a23134f797f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=48&q=60" alt="Avatar" />
                                <a href="#" className="mx-2 font-semibold text-gray-700 dark:text-gray-200">Jone Doe</a>
                            </div>
                            <span className="mx-1 text-xs text-gray-600 dark:text-gray-300">21 SEP 2023</span>
                        </div>
                    </div>
                </div>
            </div>







            <CommentCard/>
            <CommentCard/>
            <CommentCard/>
            <CommentCard/>
            <CommentCard/>
            <CommentCard/>









            {/* <section className="w-full max-w-2xl px-6 py-4 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800 my-3">

                <div className="mt-6 ">

                    <div className="w-full mt-4">
                        <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">Your Solution:</label>
                        <textarea className="block w-full h-40 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" defaultValue={""} />
                    </div>
                    <div className="flex justify-center mt-6">
                        <button className="px-4 py-2 mx-2 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Upload Image</button>
                        <button className="px-4 py-2 mx-2 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Post</button>

                    </div>
                </div>
            </section> */}

            <Form msg='Solution'/>


        </div>
    )
}
