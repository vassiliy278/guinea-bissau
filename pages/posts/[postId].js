import Link from 'next/link'
import {useRouter} from 'next/router'
import React, { useState, useEffect } from 'react';
import axios from 'axios'

const postId = ({data, params}) => {

    const [arrayData, setData] = useState(data)
    const { body, id, title } = arrayData
    const [commentsData, setComments] = useState(arrayData.comments)
    const [typedComment, setTypedComment] = useState('')
    const [commentsId, setCommentsId] = useState(commentsData.length+1)
    

    const commentTyping = (e) => {
        setTypedComment(e.target.value)
    }

    const commentAdd = (e) => {
        axios.post('https://simple-blog-api.crew.red/comments', {postId: Number(params.postId), body: typedComment})
        e.preventDefault()
        setComments([...commentsData, {id: commentsId, body: typedComment}])
        setTypedComment('')
        setCommentsId(commentsId+1)
    }

    useEffect(() => {
        console.log('edited!')
    }, [])

    return(
        <div style={styles.wrapper}>
        <Link href="/"><a style={styles.link}>Home</a></Link>
        <Link href="/posts/new"><a style={styles.link}>New Post</a></Link>

            {Object.keys(data).length !== 0 ? 
            <div style={styles.list}>
                <h2 style={styles.postId}>id: {id}</h2>
                <h1 style={styles.postTitle}>{title}</h1>
                <p style={styles.postText}>{body}</p>
                <form onSubmit={commentAdd}>
                    <input style={styles.inputForm} type="text" onChange={commentTyping} value={typedComment} placeholder="Leave comment"></input>
                    <button style={styles.inputBtn} type="sumbit">Leave</button>
                </form>
                <h3 style={styles.comments}>Comments:</h3>
                <ol style={styles.commentsList}>
                {commentsData.length !==0 ? commentsData.map(e => <li style={styles.commentsListItem} key={e.id}>{e.body}</li>) :
                <p style={styles.postId}>No comments yet...</p>}
                </ol>
            </div> 
            
            :

            <h2 style={styles.noData}>No Data...</h2>}
        </div> 
    )
}
export async function getServerSideProps({params}) {
    const res = await fetch(`https://simple-blog-api.crew.red/posts/${params.postId}?_embed=comments`)
    const data = await res.json()
    
  return {
    props: {data, params}, // will be passed to the page component as props
  }
}
export default postId

const styles = {
    wrapper: {
        width: "500px",
      margin: "20px",
    },
    link: {
      textDecoration: "none",
      border: "1px solid black",
      borderRadius: "5px",
      color: "#333",
      margin: "50px 10px",
      padding: "10px"
    },
    list: {
      padding: "50px 0px 0px 50px",
      listStyle: "none"
    },
    postText: {
        color: "#777",
        padding: "20px",
        minHeight: "300px",
        borderRadius: "5px",
        margin: "20px 0px",
        background: "#ddd",
    },
    postId: {
      margin: "10px 0px",
      cursor: "pointer",
      color: "#999"
    },
    postTitle: {
      color: "#445",
      fontSize: "28px"
    },
    noData: {
        margin: "50px",
        color: "#445",
        fontSize: "28px"
    },
    inputForm: {
        padding: "10px",
        border: "1px solid #aaa"
    },
    inputBtn: {
        padding: "10px",
        marginLeft: "20px"
    },
    comments: {
        marginTop: "50px",
        cursor: "pointer",
        color: "#777"
    },
    commentsList: {
        width: "75%"
    },
    commentsListItem: {
        display: "flex",

        fontSize: "12px",
        border: "1px solid #ccc",
        margin: "5px",
        padding: "10px",
        borderRadius: "5px",
        listStyle: "none"
    },
  }