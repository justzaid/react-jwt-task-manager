import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as taskService from '../../services/taskService';

const CommentForm = (props) => {
  const [formData, setFormData] = useState({ text: '' });
  const { taskId, commentId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      const taskData = await taskService.show(taskId);
      setFormData(taskData.comments.find((comment) => comment._id === commentId));
    };
    if (taskId && commentId) fetchTask();
  }, [taskId, commentId]);


  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (taskId && commentId) {
      taskService.updateComment(taskId, commentId, formData);
      navigate(`/tasks/${taskId}`);
    } else {
      props.handleAddComment(formData);
    }
    setFormData({ text: '' });
  };


  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="text-input">Your comment:</label>
      <textarea
        required
        type="text"
        name="text"
        id="text-input"
        value={formData.text}
        onChange={handleChange}
      />
      <button type="submit">SUBMIT COMMENT</button>
    </form>
  );
};

export default CommentForm;