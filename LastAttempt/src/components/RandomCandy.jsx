import { useState } from 'react';

function RandomCandy() {
  const [candy, setCandy] = useState(null);

  async function fetchRandomCandy() {
    const res = await fetch('https://node-api-zanett.up.railway.app/api/data');
    const allCandies = await res.json();
    const random = allCandies[Math.floor(Math.random() * allCandies.length)];
    setCandy(random.data);
  }

  return (
    <div>
      <div className="random-candy"></div>
      <button onClick={fetchRandomCandy}>🎲 Random Candy</button>
      {candy && (
        <div className="candy-card">
          <h2>{candy.name}</h2>
          <p>{candy.flavor}</p>
          <p>{candy.story}</p>
        </div>
      )}
    </div>
  );
}

export default RandomCandy;
