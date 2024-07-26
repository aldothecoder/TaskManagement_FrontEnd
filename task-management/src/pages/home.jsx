import { useState } from "react";

export default function Home() {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddTask = (e) => {
    //prevents page from being reloaded when form is submitted
    e.preventDefault();
    //if not empty after whitespace is removed
    if (inputValue.trim()) {
      setItems([...items, inputValue.trim()]);
      setInputValue("");
    }
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleAddTask}>
        <textarea
          className="textarea"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Example Text..."
          rows={4}
        />
        <button className="addTaskButton" type="submit">
          Add Task
        </button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Item</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>{item}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
