import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function InputPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/users', {
        'method': 'POST',
        'mode': 'cors',
        'headers': {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ name, email }),
      });

      if (response.ok) {
        const result = await response.text(); // Backend sends a text response
        setMessage(result); // Display the success message
        setName(''); // Clear the form
        setEmail('');
      } else {
        setMessage('Failed to add user');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred');
    }
  };

  return (
    <div>
      <h1>Add a New User</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
      <button onClick={() => navigate('/')}>Back to Home</button>
    </div>
  );
}

export default InputPage;