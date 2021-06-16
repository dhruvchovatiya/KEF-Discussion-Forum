import React from 'react'
import CommentCard from './CommentCard'
import Form from './Form'

export default function Home() {
    return (
        <div>
            <Form msg='Question'/>
            <CommentCard msg='View discussion'/>
            <CommentCard msg='View discussion'/>
            <CommentCard msg='View discussion'/>
            <CommentCard msg='View discussion'/>
            <CommentCard msg='View discussion'/>

        </div>
    )
}
