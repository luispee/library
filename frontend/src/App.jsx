import './App.css';
import AddBookForm from './components/AddBookForm';
import { useState, useEffect } from 'react';

const HOST = 'http://192.168.1.118:5000/';

function App() {
  const [options, setOptions] = useState({
    libraries: [],
    conditions: [],
    intents: [],
    categories: [],
  });

   useEffect(() => {
    // Define a function to fetch all required data
    const fetchData = async () => {
      try {
        const librariesResponse = await fetch(`${HOST}/api/libraries`);
        if (!librariesResponse.ok) {
          throw new Error(`Failed to fetch libraries: ${librariesResponse.status}`);
        }
        const libraries = await librariesResponse.json();
  
        const conditionsResponse = await fetch(`${HOST}/api/conditions`);
        if (!conditionsResponse.ok) {
          throw new Error(`Failed to fetch conditions: ${conditionsResponse.status}`);
        }
        const conditions = await conditionsResponse.json();
  
        const intentsResponse = await fetch(`${HOST}/api/intents`);
        if (!intentsResponse.ok) {
          throw new Error(`Failed to fetch intents: ${intentsResponse.status}`);
        }
        const intents = await intentsResponse.json();
  
        const categoriesResponse = await fetch(`${HOST}/api/categories`);
        if (!categoriesResponse.ok) {
          throw new Error(`Failed to fetch categories: ${categoriesResponse.status}`);
        }
        const categories = await categoriesResponse.json();
  
        setOptions({
          libraries,
          conditions,
          intents,
          categories,
        });
      } catch (error) {
        console.error('Failed to fetch options:', error.message);
      }
    };
  
    fetchData();
  }, []);
 
  return (
    <div className="main-container">
      <h1 className="app-title">Biblioteca</h1>
      <AddBookForm
        libraries={options.libraries}
        conditions={options.conditions}
        intents={options.intents}
        categories={options.categories}
      />
    </div>
  );
}

export default App;