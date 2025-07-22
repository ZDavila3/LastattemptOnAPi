import { useState } from 'react';

function EditCandyModal({ candy, onClose, onUpdate }) {
  const [form, setForm] = useState({ ...candy });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await fetch(`https://node-api-zanett.up.railway.app/api/data/${candy.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data: {
          name: form.name,
          type: form.type,
          flavor: form.flavor,
          rating: parseFloat(form.rating),
          story: form.story
        }
      })
    });
    onUpdate(); // refresh the candy list
    onClose();  // close the modal
  }

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={handleChange} />
        <input name="type" value={form.type} onChange={handleChange} />
        <input name="flavor" value={form.flavor} onChange={handleChange} />
        <input name="rating" value={form.rating} onChange={handleChange} type="number" step="0.1" />
        <textarea name="story" value={form.story} onChange={handleChange} />
        <button type="submit">Save</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
}

export default EditCandyModal;
