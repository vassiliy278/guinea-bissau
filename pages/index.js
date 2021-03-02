import Link from 'next/link'
import DeleteButton from './react/deletePost'
import {useState, useEffect} from 'react'



export default function Next({data}) {
  const [arrayData, setData] = useState(data)

  const handleDeletePost = (id) => {
    const newArray = arrayData.filter(e => e.id !== id)
    setData(newArray)
  }

  return (
        <div style={styles.wrapper}>
          <Link  href="/posts/new"><a style={styles.link}>New Post</a></Link>
          <ul style={styles.list}>
            {arrayData.map(e => 
            <li key={e.id} style={styles.listItem}>
              <h2 style={styles.postTitle}>{e.title}</h2>
              <Link href={`/posts/${e.id}`}><p style={styles.readMore}>Read more</p></Link>
              <DeleteButton postId={e.id} handleDelete={handleDeletePost}/>
            </li>)}
          </ul>
        </div>    
  )
}
export async function getServerSideProps({params}) {
    const res = await fetch(`https://simple-blog-api.crew.red/posts`)
    const data = await res.json()
  return {
    props: {data}, // will be passed to the page component as props
  }
}

const styles = {
  wrapper: {
    margin: "20px",
  },
  link: {
    textDecoration: "none",
    border: "1px solid black",
    borderRadius: "5px",
    color: "#333",
    margin: "50px",
    padding: "10px"
  },
  list: {
    padding: "50px 0px 0px 50px",
    listStyle: "none"
  },
  listItem: {
    paddingTop: "50px",
  },
  readMore: {
    margin: "10px 0px",
    cursor: "pointer",
    color: "#999"
  },
  postTitle: {
    color: "#445",
    fontSize: "28px"
  }
}