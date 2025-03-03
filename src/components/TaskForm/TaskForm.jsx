import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as taskService from '../../services/taskService';

const TaskForm = (props) => {
    const { taskId } = useParams();
    const [formData, setFormData] = useState({
        title: '',
        text: '',
        category: 'Done',
  });

  useEffect(() => {
    const fetchTask = async () => {
      const taskData = await taskService.show(taskId);
      setFormData(taskData);
    };
    if (taskId) fetchTask();
  }, [taskId]);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    evt.preventDefault();
    if (taskId) {
      props.handleUpdateTask(taskId, formData);
    } else {
      props.handleAddTask(formData);
    }
  };  

  return (
    <main>
      <form onSubmit={handleSubmit}>
      <h1>{taskId ? 'Edit Task' : 'New Task'}</h1>
        <label htmlFor="title-input">Title</label>
        <input
          required
          type="text"
          name="title"
          id="title-input"
          value={formData.title}
          onChange={handleChange}
        />
        <label htmlFor="text-input">Text</label>
        <textarea
          required
          type="text"
          name="text"
          id="text-input"
          value={formData.text}
          onChange={handleChange}
        />
        <label htmlFor="category-input">Category</label>
        <select
          required
          name="category"
          id="category-input"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="Not started">Not started</option>
          <option value="In process">In process</option>
          <option value="Done">Done</option>
        </select>
        <button type="submit">SUBMIT</button>
      </form>
    </main>
  );
};

export default TaskForm;