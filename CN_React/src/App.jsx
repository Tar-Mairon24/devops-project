import { useState, useEffect } from 'react';
import './App.css'

function App() {
  const [data, setData] = useState(null);
  useEffect(()=> {
    fetch("http://localhost:3000/users",{ 
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
            <li key={user.id}>{user.name}</li>
            
          ))}
        </ul>
      </div>

    </div>
    
  );
}

export default App
