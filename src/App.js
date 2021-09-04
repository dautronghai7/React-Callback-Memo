import React, { useCallback, useMemo, useState } from 'react';
import './App.css';
import ChildrenComponent from './components/childrenComponent';
  /**useMemo */
  const expensiveFunction = (number)=>{
    console.log('Bat dau');
    const start = new Date();

    while((new Date() - start) <= 3000);

    console.log('Ket thuc: ', new Date() - start, 'ms');

    return number*number;
  }
function App() {
  const [users, setUsers] = useState([]);  
  //https://reqres.in/api/users
  const getData = useCallback( (type)=>{
    return fetch(`https://reqres.in/api/${type}`);
  }, [])//KHi thuc hien gan 1 bien cho mot objec/ aray/ function thi day la mot tham chieu
  /**
   * tham tri: khi thuc hien gan bien a= 1; b=1; so sanh a=== b ? thi tra ve true.
   * tham chieu: KHi thuc hien gan a=objectA; b = objectA khi thuc hien so sanh a===b thi se tra ve false.
   * vi khi thuc hien gan cho mot object hay 1 function thi js se thuc hien gan a = mot vung nho tham chieu den objectA; 
   * tuong tu khi thuc hien gan b = objectA thi js se thuc hien gan b den mot vung nho va tham chieu den objectB.
   * Nen khi thuc hien so sanh se thuc hien so sanh den 2 vung nho khac nhau dan den ket qua la False
   */
  const handleClick = ()=>{
    console.log('on lick get user data');
    getData('users')
      .then((res)=>{
        return res.json();
      }).then((d)=>{
        setUsers(d.data);
      });

  }
  
  /**useMomo */
  const [count, setCount] = useState(0);
  const [num, setNum] = useState(10);
  const number = useMemo(
    ()=>{ 
      expensiveFunction(num)
    },[num]);
  //**Khi thuc hien cac action. Component se duoc render lai toan bo. Tuy nhien mot so funtion da thuc hien va gia tri khong thay doi sau khi renderlai. Nhu vay se anh huong den hieu suat cua component. Vi mot so function can thoi gian xu ly lau.
  /*
  */

  return (
    <div className="App">
        <h1>Example useMemo hook</h1>
        <p>expensive function: {number}</p>
        <p>Count: {count}</p>
        <button onClick={()=>setCount(count + 1)}>Add</button>
        <button onClick={()=>setNum(20)}>Change number</button>

        <h1>Example about useCallback hook</h1>
        <hr />
        <button onClick={handleClick}>Get user data</button>
        <p>{JSON.stringify(users)}</p>          
        <ChildrenComponent getData={getData} />
        
    </div>
  );
}

export default App;
