import { useState } from 'react';

function AddCandyForm({ onAdd }) {
  const [form, setForm] = useState({
    id: '',
    name: '',
    type: '',
    flavor: '',
    rating: '',
    story: ''
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await fetch('https://node-api-zanett.up.railway.app/api/data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: form.id,
        data: {
          name: form.name,
          type: form.type,
          flavor: form.flavor,
          rating: parseFloat(form.rating),
          story: form.story
        }
      })
    });
    onAdd();
    setForm({ id: '', name: '', type: '', flavor: '', rating: '', story: '' });
  }

  return (
    <form onSubmit={handleSubmit} className="candy-form">
      <h2>Add a New Candy 🍭</h2>
      <div className="form-fields">
        <input name="id" value={form.id} onChange={handleChange} placeholder="Unique ID ✨" required />
        <input name="name" value={form.name} onChange={handleChange} placeholder="Candy Name 🍬" required />
        <input name="type" value={form.type} onChange={handleChange} placeholder="Type 🎀" />
        <input name="flavor" value={form.flavor} onChange={handleChange} placeholder="Flavor 🍓" />
        <input name="rating" value={form.rating} onChange={handleChange} placeholder="Rating 🌟" type="number" step="0.1" />
        <textarea name="story" value={form.story} onChange={handleChange} placeholder="Candy lore... 📖" />
      </div>
      <div className="form-actions">
        <button type="submit">💌 Add Candy</button>
      </div>
    </form>
  );
}

export default AddCandyForm;
