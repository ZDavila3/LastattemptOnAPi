import { useState, useEffect } from 'react';
import CandyCard from './components/CandyCard';
import AddCandyForm from './components/AddCandyForm';
import EditCandyModal from './components/EditCandyModal';
import RandomCandy from './components/RandomCandy';
import CandyLookup from './components/CandyLookup';


function App() {
  const [candies, setCandies] = useState([]);
  const [editingCandy, setEditingCandy] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchCandies() {
    setLoading(true);
    const res = await fetch('https://node-api-zanett.up.railway.app/api/data');
    const data = await res.json();
    setCandies(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchCandies();
  }, []);

  async function handleDelete(id) {
    await fetch(`https://node-api-zanett.up.railway.app/api/data/${id}`, {
      method: 'DELETE'
    });
    fetchCandies();
  }

  function openEditor(candy) {
    setEditingCandy(candy);
  }

  function closeEditor() {
    setEditingCandy(null);
  }

  return (
    <div className="App">

      <AddCandyForm onAdd={fetchCandies} />
      <CandyLookup onEditCandy={openEditor} />


    {editingCandy && (
      <EditCandyModal
      candy={editingCandy}
      onClose={closeEditor}
      onUpdate={fetchCandies}
    />
  )}


      {editingCandy && (
        <EditCandyModal
          candy={editingCandy}
          onClose={closeEditor}
          onUpdate={fetchCandies}
        />
      )}
    </div>
  );
}

export default App;
