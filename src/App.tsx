import { useEffect, useState } from 'react';

function App() {
  useEffect(() => {
    fetch('https://fakestoreapi.com/products?limit=5')
      .then((res) => res.json())
      .then((json) => console.log(json));
  }, []);

  return (
    <>
      <div>
        <h1 className="text-red-300">Look Git</h1>
        <button>Click Me</button>
      </div>
    </>
  );
}

export default App;
