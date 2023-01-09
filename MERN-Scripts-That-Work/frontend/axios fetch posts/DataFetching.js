// from https://www.youtube.com/watch?v=bYFYF2GnMy8&ab_channel=Codevolution
import React, {
    useState,
    useEffect
} from 'react'
import axios from 'axios'
//https://jsonplaceholder.typicode.com/

export default function DataFetching() {
    const [posts, setPosts] = useState([])

    // af useEffect accepts Anonymous Function 
    useEffect(() => { 
        axios.get('https://jsonplaceholder.typicode.com/posts')
        .then((res) => { 
            // prints in the browser's console 
            console.log(res);
            setPosts(res.data)
        })
        .catch((error) => { 
            console.log(error);
         })
        
    }, []) // to render only once
    
    return ( 
        <div> 
            <ul>
            {   posts.map((post) => {
                 <li key={post.id}> {post.title} </li> 
                })    
            }
            </ul>
            
        </div>
    )
}