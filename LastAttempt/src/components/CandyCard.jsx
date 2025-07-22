import './CandyCard.css';

function CandyCard({ candy, onEdit, onDelete }) {
  return (
    <div className="candy-card">
      <h2>{candy.name} 🍬</h2>
      <p><strong>Type:</strong> {candy.type}</p>
      <p><strong>Flavor:</strong> {candy.flavor}</p>
      <p><strong>Rating:</strong> {candy.rating}</p>
      <p><em>{candy.story}</em></p>
      <div className="btn-row">
        <button onClick={onEdit}>Edit</button>
        <button onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
}

export default CandyCard;
