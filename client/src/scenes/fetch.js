import React, { useState, useEffect } from 'react';

const DataFetchingComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Function to fetch data from the server or API
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/comments',{
            method: 'GET'
        });
        const data = await response.json();
        setData(data); // Update the state with fetched data
        setLoading(false); // Set loading to false after data is fetched
        console.log(data)
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false); // Set loading to false even in case of an error
      }
    };

    fetchData(); // Call the function to fetch data when the component mounts

    // Optionally, you can return a cleanup function from useEffect
    // This function will be executed when the component is unmounted
    return () => {
      
    };
  }, []); // The empty dependency array means this effect runs only once on mount

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Data Fetching Example</h1>
      {data.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
};

export default DataFetchingComponent;
