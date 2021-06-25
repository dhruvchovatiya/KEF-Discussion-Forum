import React from 'react'
import CommentCard from './CommentCard'
import Form from './Form'
import {useParams} from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Thread() {
    const {id} = useParams()

    const [post,setPost] = useState({})
    const [comments, setComments] = useState([])
    const [submitted, setSubmitted] = useState(false)


    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await axios.get(('/api/posts/'+id))
                // console.log(res)
                setPost(res.data)
                setComments(post.comments)
                // console.log(comments)
            } catch(err) {
                console.log(err)
            }
        }

        fetchPost()
    }, [submitted])

    // console.log(post)

    return (
        <div>
            <div className="max-w-2xl mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 my-3">
                <img className="object-cover w-full h-64" src="https://images.unsplash.com/photo-1550439062-609e1531270e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="Article" />
                <div className="p-6">
                    <div>
                        {
                            post.tags && post.tags.map((tag) => (
                                <span className="text-xs font-medium text-blue-600 uppercase dark:text-blue-400 mr-2">{tag}</span>
                            ))
                        }
                        <a href="#" className="block mt-2 text-2xl font-semibold text-gray-800 dark:text-white hover:text-gray-600 hover:underline">{post.title}</a>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{post.desc}</p>
                    </div>
                    <div className="mt-4">
                        <div className="flex items-center">
                            <div className="flex items-center">
                                <img className="object-cover h-10 rounded-full" src="https://images.unsplash.com/photo-1586287011575-a23134f797f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=48&q=60" alt="Avatar" />
                                <a href="#" className="mx-2 font-semibold text-gray-700 dark:text-gray-200">{post.firstName} {post.lastName}</a>
                            </div>
                            <span className="mx-1 text-xs text-gray-600 dark:text-gray-300">21 SEP 2023</span>
                        </div>
                    </div>
                </div>
            </div>

            
            {post.comments && post.comments.map((comment,id) => (
                <CommentCard msg='' post={comment} isThread={true}/>
            ))}



            <Form msg='Solution' id={id} setSubmitted={setSubmitted} submitted={submitted}/>


        </div>
    )
}
