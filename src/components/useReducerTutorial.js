import React, { useReducer } from 'react'

const countReducer = (state, action)=>{
    switch (action) {
        case 'REDUCES':
            return state -1;
        case 'INCREMENT':            
            return state +1;
        case 'RESET':
            return 0;
        default:
            break;
    }
}
const postReducer =(state, action)=>{
    switch (action.type) {
        case 'SET_POST_NUM':            
            return action.data;    
        default:
            break;
    }
}
const initUsers = {
    loading: false,
    data:[],
    error: null,
}
const usersReducer = (state, action)=>{
    switch (action.type) {
        case 'GET_USERS_REQUEST':            
            return {
                ...state,
                loading: true
            }
        case 'GET_USERS_SUCCESS':            
            return {
                ...state,
                loading: false,
                data: action.data
            }
        case 'GET_USERS_ERROR':              
            return {
                ...state,
                loading: false,
                data: [],
                error: action.data
            }
        default:
            break;
    }
}
const UseReducerTutorial = () => {
    const [count, dispatchCount] = useReducer(countReducer, 0);
    const [post, dispatchPost] = useReducer(postReducer, 0);
    const [users, dispatchUser] = useReducer(usersReducer, initUsers)

    const getUsers = ()=>{
        dispatchUser({
            type: 'GET_USERS_REQUEST'
        })
        //fake request with timeout 3000 ms
        setTimeout(()=>{
            fetch('https://reqres.in/api/users')
                .then(res=>{res.json(); console.log('======================')})
                .then(res=>{                    
                    dispatchUser({
                        type: 'GET_USERS_SUCCESS',
                        data: res
                    })
                }).catch(e=>{
                    console.log('Loi roi', e);                   
                    dispatchUser({
                        type: 'GET_USERS_ERROR',
                        data: e
                    })
                });
        }, 3000);
    }

    return (
        <div>
            <h1>UseReducer Tutorial</h1>
            <hr/>
            <p>Value Reducer: {count}</p>
            <button onClick={()=>dispatchCount('INCREMENT')}>Increment (+)</button>
            <button onClick={()=>dispatchCount('RESET')}>Reset</button>
            <button onClick={()=>dispatchCount('REDUCES')}>Reduces (-)</button>
            <hr></hr>
            <p>Post Number: {JSON.stringify( post)}</p>
            <button onClick={()=>dispatchPost({type: 'SET_POST_NUM', data: 100})}>Set Title</button>
            <hr></hr>
            {users.loading ? <p>Loading...</p> : <p>{JSON.stringify(users.data)}</p>}
            <button onClick={getUsers}>Get Users</button>
            <hr />
        </div>
    )
}

export default UseReducerTutorial
