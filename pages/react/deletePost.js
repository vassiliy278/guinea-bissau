
import axios from 'axios'
function DeletePost({postId, handleDelete}) {
    
    
    const deletePost = () => {
        handleDelete(postId)
        axios.delete(`https://simple-blog-api.crew.red/posts/${postId}`)
    }
    return (
        <>
            <button onClick={deletePost}>Delete</button>
        </>
    )
}

export default DeletePost