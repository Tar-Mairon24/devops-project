import { useState, useEffect } from 'react';
import './App.css'

function App() {
  const [data, setData] = useState(null);
  useEffect(()=> {
    fetch("http://129.80.95.120/users",{ 
      'mode': 'cors',
      'headers': {
          'Access-Control-Allow-Origin': '*',
      }
    }) 
      .then((response) => response.json())
      .then((data) => setData(data));
      
  }, []);
  return (
    <div className='App'>
      <h1>Fetch</h1>
      <div className='card'>
        <ul>
          {data?.map((user)=>(
            <li key={user.id}>{user.name}, {user.email}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App
