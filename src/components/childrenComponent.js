import React, { useEffect, useState } from 'react'

const ChildrenComponent = ({getData}) => {
    const [comments, setComments] = useState([]);
    useEffect(()=>{
        console.log('Childrent get comments');
        getData('comments').then(res=>res.json()).then(d=>setComments(d.data));
    }, [getData]);
    return (
        <div>
            <h1> Childrent: get all comments</h1>
            <hr></hr>
            <p>{JSON.stringify(comments)}</p>
        </div>
    )
}

export default ChildrenComponent
