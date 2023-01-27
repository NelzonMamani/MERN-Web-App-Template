import React, { useEffect, useState } from "react"
// HOOKS are only used inside funtion componets not in class components
// HOOKS are always at the top of function componets in exact order
// Hooks can not be nested in loops or if statemets

function App() {   
  const [resourceType, setResourceType] = useState('posts')
  console.log('App has been rendered');
  //everything inside useEffect runs everytime the app renders unless empty array
  useEffect(()=>{    
    console.log('resource type changed')
  },[resourceType]) // everytime resourceType changes, useEffect Hook will be run

  return (  
  <>
  <div >
  <button onClick={()=> setResourceType('posts')}>Posts</button>
  <button onClick={()=> setResourceType('users')}>Users</button>
  <button onClick={()=> setResourceType('comments')}>comments</button>
  </div>
  <h1>{resourceType}</h1>   
  </>
  )
}
export default App
