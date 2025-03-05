import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as taskService from '../../services/taskService';
import './CommentForm.css';

const CommentForm = (props) => {
  const [formData, setFormData] = useState({ text: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { taskId, commentId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      setIsLoading(true);
      try {
        const taskData = await taskService.show(taskId);
        const comment = taskData.comments.find((comment) => comment._id === commentId);
        if (comment) {
          setFormData(comment);
        } else {
          setError('Comment not found!');
        }
      } catch (err) {
        setError('Failed to load task data!');
      } finally {
        setIsLoading(false);
      }
    };

    if (taskId && commentId) fetchTask();
  }, [taskId, commentId]);

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (taskId && commentId) {
        await taskService.updateComment(taskId, commentId, formData);
        navigate(`/tasks/${taskId}`);
      } else {
        await props.handleAddComment(formData);
      }
      setFormData({ text: '' });
    } catch (err) {
      setError('Failed to submit the comment!');
    } finally {
      setIsLoading(false);
    }
  };

  const isEditMode = Boolean(commentId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className={`commentForm ${isEditMode ? 'editForm' : 'newForm'}`}>
      {isEditMode && (
        <div className="pageHeader">
          <h1>Edit Checklist</h1>
        </div>
      )}
      <label className="labelcolor" htmlFor="text-input">
        {isEditMode ? "Edit Checklist:" : "Enter checklist description:"}
      </label>
      <textarea
        required
        type="text"
        name="text"
        id="text-input"
        value={formData.text}
        onChange={handleChange}
      />
      <button type="submit" disabled={isLoading}>
        {isEditMode ? "Update checklist" : "Submit"}
      </button>
      {error && <div className="error-message">{error}</div>}
    </form>
  );
};

export default CommentForm;
