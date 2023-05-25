import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [API_ROUTE] = useState('https://proyecto-moviles.onrender.com'+'/')
  const [test, setTest] = useState('')
  const [data_test, setDataTest] = useState('')
  const [count, setCount] = useState(0)

    // ! it works
  const fetchTestRequest = () => {
      fetch(API_ROUTE+'test')
      .then((response) => response.json())
      .then((data) => {
        setTest(data)
      })
      .catch(error => console.error('Error al llamar a la API... :('))
    };

      // ! it works
  const postData = async (url, data) => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error('Error: ' + response.status);
      }
  
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error(error);
    }
  };

    // ! it works
    const fetchDataRequest = () => {
      const basic_string = 'Lorem ipsum dolor';
  
      const data = {
        item: basic_string,
      };
  
      postData(API_ROUTE+'data_upload', data)
      .then(responseData => {
        setDataTest(responseData)
      })
      .catch(error => console.error('Error al llamar a la API'))
    };

    const clearTests = () => {
      setCount(0);
      setTest('');
      setDataTest('');
    }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Prueba de deploys frontend/backend</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      <div className="card">
        <button onClick={() => fetchTestRequest()}>
          Connection test
        </button>
        { test }
      </div>
      <div className="card">
        <button onClick={() => fetchDataRequest()}>
          Data test
        </button>
        { data_test }
      </div>
      <div className="card">
        <button onClick={() => clearTests()}>
          Clear tests
        </button>
      </div>
    </>
  )
}

export default App
