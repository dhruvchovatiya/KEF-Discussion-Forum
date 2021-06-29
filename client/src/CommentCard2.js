import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'


const getUser = async (token) => {
    try {
        const user = await axios.get('/api/auth/userFromJWT/' + token)
        return user

    } catch (err) {
        console.log(err)
    }
}

export default function CommentCard(props) {

    const postId = props.postId
    const comment = props.post
    const loggedIn = props.loggedIn

    const [votes, setVotes] = useState(comment.votes)
    const [voted, setVoted] = useState(false)
    const [vote, setVote] = useState(0)


    let user
    useEffect(() => {

        const handleReload = async () => {

            if (loggedIn) {
                user = await getUser(localStorage.getItem('token'))
                console.log(user.data)
                if (user.data.voted.length != 0) {
                    let obj
                    for (obj of user.data.voted) {
                        if (comment._id == obj.commentId && obj.vote != 0) {
                            setVoted(true)
                            setVote(obj.vote)
                            console.log({ str: 'h', votr: obj.vote })
                        }
                    }
                }

            }
        }

        handleReload()

    }, [vote, voted, votes])

    const handleUp = async e => {
        if(voted&&vote==1) {
            console.log('already voted!')
        } else {

            try {
                console.log(comment._id)
                const res = await axios.post('/api/posts/voteComment/' + postId + '/' + comment._id, { token: localStorage.getItem('token'), up: 'true' })
                console.log(res)
                setVoted(true)
                setVote(vote+1)
                setVotes(votes + 1)
                console.log('vo')
                console.log({ voted, vote, votes })
            } catch (err) {
                console.log(err)
            }
        }
    }
    const handleDown = async e => {
        if(voted&&vote==-1) {
            console.log('already voted!')
        } else {

            try {
                const res = await axios.post('/api/posts/voteComment/' + postId + '/' + comment._id, { token: localStorage.getItem('token') })
                console.log(res)
                setVoted(true)
                setVote(vote-1)
                setVotes(votes - 1)
            } catch (err) {
                console.log(err)
            }
        }
    }

  


    return (
        <div className="max-w-2xl px-8 py-4 mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800 my-3">
            <div className="flex items-center justify-between">

                {/* <span className="text-sm font-light text-gray-600 dark:text-gray-400">{props.post.createdAt.split('T')[0]}</span> */}
                {/* <a className="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-200 transform bg-gray-600 rounded cursor-pointer hover:bg-gray-500">Design</a> */}
            </div>
            <div className="mt-2">
                {/* {!props.isThread && <a href="#" className="text-2xl font-bold text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 hover:underline">{props.post.title}</a>} */}
                <p className="mt-2 text-gray-600 dark:text-gray-300">{props.post.desc}</p>
            </div>
            <div className="flex items-center justify-between mt-4">
                <Link to={'/thread/' + props.post._id} className="text-blue-600 dark:text-blue-400 hover:underline">{props.msg}</Link>

                {/* <button onClick={handleUp} className={voted && vote == 1 ? 'disabled:opacity-50 cursor-default' + (vote === 1 ? ' bg-red-600' : ' ') : ''}>UP</button> */}
                {/* <h1>{votes}</h1> */}
                {/* <button onClick={handleDown} className={voted && vote == -1 ? 'disabled:opacity-50 cursor-default' + (vote === -1 ? ' bg-red-600' : ' ') : ''}>DOWN</button> */}

                <div className='flex align-middle'>
                    <svg xmlns="http://www.w3.org/2000/svg" className={voted&&vote==1?"cursor-default text-red-600 h-8 w-8":"cursor-pointer h-8 w-8"+" h-8 w-8"} viewBox="0 0 20 20" fill="currentColor" onClick={handleUp}>
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                    </svg>
                    <h1 className='px-2'>{votes}</h1>
                    <svg xmlns="http://www.w3.org/2000/svg" className={voted&&vote==-1?"cursor-default text-red-600 h-8 w-8":"cursor-pointer h-8 w-8"+" h-8 w-8"} viewBox="0 0 20 20" fill="currentColor" onClick={handleDown}>
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
                    </svg>
                </div>
            </div>
        </div>
    )
}
