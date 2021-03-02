import Link from 'next/link'
import {useRouter} from 'next/router'
import React, { useState, useEffect } from 'react';
import axios from 'axios'

const NewPost = () => {
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [successMsg, setSuccessMsg] = useState(false)
    

    const handleChange = ({target}) => {
        switch(target.name) {
            case 'text': 
                setText(target.value)
                break
            case 'title': 
                setTitle(target.value)
                break
        }
    }

    const handleAdd = (e) => {
        e.preventDefault()
        axios.post('https://simple-blog-api.crew.red/posts', {title: title, body: text})
        setTitle('')
        setText('')
        setSuccessMsg(true)
        setTimeout(() => setSuccessMsg(false), 1500)
    }
    return(
        <div style={styles.wrapper}>
            <Link href="/"><a style={styles.link}>Home</a></Link>
            <h2 style={styles.postTitle}>Title:</h2>
            <form onSubmit={handleAdd}>
                <input style={styles.inputForm} type="text" name="title" value={title} onChange={handleChange}></input>
                <h2 style={styles.postTitle}>Text:</h2>
                <input style={styles.inputForm} type="text" name="text" value={text} onChange={handleChange}></input>
                <button style={styles.inputBtn}>Add</button>
            </form>
            {successMsg && <h2>Post Added!</h2>}
        </div>
    )
}

export default NewPost

const styles = {
    wrapper: {
        width: "500px",
        margin: "20px 50px",
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
        height: "300px",
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
        marginTop: "50px",
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
        border: "1px solid #aaa",
        width: "80%"
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