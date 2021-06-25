import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'



export default function Form(props) {
  const history = useHistory()
  const [field, setField] = useState('')
  const [title, setTitle] = useState('')
  const formData = {
    token:localStorage.getItem('token'),
    desc:field,
    title:title
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(formData)
    if ((!title || !title.trim()) && props.msg!='Solution') {
      alert('Title cannot be empty')
    }
    else if((!field || !field.trim()) && props.msg==='Solution') {
      alert('Description cannot be empty')
    }
    else {
      if(props.msg!='Solution') {
        try {
          const res = await axios.post('/api/posts',formData)
          if(res.status===502) {
            localStorage.removeItem('token')
            props.setLoggedIn(false)
            history.push('/login')
          }
          if(!res) {
            alert('No response')
          } else {
            console.log(res)  
            props.setSubmitted(!props.submitted)
            setField('')
            setTitle('')
            history.push('/')
          } 

        } catch (err) {
          console.log(err)
        }
      } else {
        try {
          const res = await axios.post('/api/posts/'+props.id,formData)
          if(res.status===502) {
            localStorage.removeItem('token')
            props.setLoggedIn(false)
            history.push('/login')
          }
          if(!res) {
            alert('No response')
          } else {
            console.log(res)  
            props.setSubmitted(!props.submitted)
            setField('')
            setTitle('')
            history.push('/thread/'+props.id)
          } 

        } catch (err) {
          console.log(err)
        }
      }
    }
  }

  return (
    <section className="w-full max-w-2xl px-6 py-4 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800 my-3">

      <div className="mt-6 ">

        <div className="w-full mt-4">
          <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">{'Your ' + props.msg + ':'}</label>
          {props.msg!='Solution' && <textarea placeholder="Title of your question" className="block w-full mb-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" defaultValue={""} onChange={e => setTitle(e.target.value)} />}

          {<textarea placeholder={"Describe your "+props.msg} className="block w-full h-40 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" defaultValue={""} onChange={e => setField(e.target.value)} />}
        </div>
        {/* {isEmpty && <h1 className="text-red-700 flex justify-center mt-4">Title can't be Empty</h1>} */}
        <div className="flex justify-center mt-4">
          <button className="px-4 py-2 mx-2 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Upload Image</button>
          <button className="px-4 py-2 mx-2 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600" type="submit" onClick={handleSubmit}>Post</button>

        </div>
      </div>
    </section>
  )
}
