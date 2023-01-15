// https://www.youtube.com/watch?v=1tfd6ANaNRY&ab_channel=Codevolution
// from https://www.youtube.com/watch?v=bYFYF2GnMy8&ab_channel=Codevolution
import React, {
    useState,
    useEffect
} from 'react'
import axios from 'axios'
//https://jsonplaceholder.typicode.com/

export default function DataFetching() {
    const [post, setPost] = useState({})
    const [id, setId] = useState(1)

    // af useEffect accepts Anonymous Function 
    useEffect(() => { 
        axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then((res) => { 
            // prints in the browser's console 
            console.log(res);
            setPost(res.data)
        })
        .catch((error) => { 
            console.log(error);
         })
        
    }, [id]) // render everytime id changes
    
    return ( 
        <div> 
            <input type="text" value={id} onChange={e => setId(e.target.value)} />
            <div>{post.title}</div>
            {/* <ul>
            {   posts.map((post) => {
                 <li key={post.id}> {post.title} </li> 
                })    
            }
            </ul> */}
            
        </div>
    )
}