import { useState } from 'react';
import CandyCard from './CandyCard';

function CandyLookup({ onEditCandy }) {
  const [searchId, setSearchId] = useState('');
  const [foundCandy, setFoundCandy] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSearch(e) {
    e.preventDefault();
    setLoading(true);
    setNotFound(false);
    setFoundCandy(null);

    try {
      const res = await fetch(`https://node-api-zanett.up.railway.app/api/data/${searchId}`);
      if (!res.ok) {
        setNotFound(true);
      } else {
        const data = await res.json();
        setFoundCandy(data.data);
      }
    } catch (err) {
      setNotFound(true);
    }

    setLoading(false);
  }

  async function handleDelete() {
    await fetch(`https://node-api-zanett.up.railway.app/api/data/${searchId}`, {
      method: 'DELETE'
    });
    setFoundCandy(null);
    setSearchId('');
  }

  function handleEdit() {
    console.log('Edit button clicked:', foundCandy);
    // You can connect this to your EditCandyModal if you want ✨
  }

  return (
    <div className="candy-lookup">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="🔍 Search candy by ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <button type="submit">✨ Reveal Candy</button>
      </form>

      {loading && <div className="jellybean-loader">🍬 Searching...</div>}
      {notFound && (
        <p style={{ color: 'hotpink', marginTop: '1rem' }}>
          No candy found 🫢
        </p>
      )}

      {foundCandy && (
        <>
          <CandyCard
            candy={foundCandy}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

          <div className="lookup-actions">
            <button onClick={handleEdit}>Update 🍥</button>
            <button onClick={handleDelete}>Delete 🍬</button>
          </div>
        </>
      )}
    </div>
  );
}

export default CandyLookup;
