import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css'

function App() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  useEffect(()=> {
    fetch("http://localhost/users",{ 
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
      <h1>Users on database</h1>
      <div className='card'>
        <ul>
          {data?.map((user)=>(
            <li key={user.id}>{user.name}, {user.email}</li>
          ))}
        </ul>
      </div>
      <button onClick={() => navigate('/input')}>Add Users</button>
    </div>
  );
}

export default App
