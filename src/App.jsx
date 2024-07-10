import { useState, useEffect } from "react";
import { AiOutlineDelete } from "react-icons/ai";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (inputValue === "") {
      alert("You must write something!");
    } else {
      setTasks([...tasks, { text: inputValue, checked: false }]);
      setInputValue("");
    }
  };

  const toggleTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].checked = !newTasks[index].checked;
    setTasks(newTasks);
  };

  const removeTask = (index, event) => {
    event.stopPropagation();
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  return (
    <div className="container">
      <div className="todo-app">
        <h2 className="">ToDo App</h2>
        <div className="row">
          <input
            type="text"
            id="input-box"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button onClick={addTask}>Add</button>
        </div>
        <ul id="list-container">
          {tasks.map((task, index) => (
            <li
              key={index}
              className={task.checked ? "checked" : ""}
              onClick={() => toggleTask(index)}
            >
              {task.text}
              <span onClick={(e) => removeTask(index, e)}>
              <AiOutlineDelete id="icon"/>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
