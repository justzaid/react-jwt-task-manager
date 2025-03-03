import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as taskService from '../../services/taskService';

const CommentForm = (props) => {
  const [formData, setFormData] = useState({ text: '' });
  const { taskId, commentId } = useParams();



  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.handleAddComment(formData)
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