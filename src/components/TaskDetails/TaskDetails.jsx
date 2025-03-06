import { useParams, Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import * as taskService from '../../services/taskService';
import CommentForm from '../CommentForm/CommentForm';
import { AuthedUserContext } from '../../App';
import styles from './TaskDetails.module.css';

const TaskDetails = (props) => {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const user = useContext(AuthedUserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      const taskData = await taskService.show(taskId);
      setTask(taskData);
    };
    fetchTask();
  }, [taskId]);

  const handleAddComment = async (commentFormData) => {
    const newComment = await taskService.createComment(taskId, commentFormData);
    setTask({ ...task, comments: [...task.comments, newComment] });
  };

  const handleDeleteComment = async (commentId) => {
    const deleted = await taskService.deleteComment(taskId, commentId);
    if (deleted) {
      setTask({
        ...task,
        comments: task.comments.filter((comment) => comment._id !== commentId),
      });
      navigate(`/tasks/${taskId}`);
    }
  };

  if (!task) return <main>Loading...</main>;

  const categoryClass = `${styles.category} ${styles[task.category.replace(' ', '').toLowerCase()]}`;

  return (
    <main className={styles.container}>
      <div className={styles.taskDetailsCard}>
        <header className={styles.header}>
          <div className={styles.taskHeader}>
            <h1 className={styles.title}>{task.title}</h1>
            <p className={categoryClass}>{task.category.toUpperCase()}</p>
          </div>
          <p className={styles.authorInfo}>
            {task.author.username} posted on {new Date(task.createdAt).toLocaleDateString()}
          </p>
        </header>

        <div className={styles.descriptionWrapper}>
          <p className={styles.description}>Description: <span>{task.text}</span></p>
        </div>

        {task.author._id === user._id && (
          <div className={styles.actions}>
            <Link to={`/tasks/${taskId}/edit`} className={styles.editButton}>Edit Task</Link>
            <button onClick={() => props.handleDeleteTask(taskId)} className={styles.deleteButton}>Delete Task</button>
          </div>
        )}
      </div>

      <section className={styles.commentsSection}>
        <div className={styles.taskDetailsCard}>
          <h2>Checklists</h2>
          <hr />
          {!task.comments.length && <p>No Checklists yet. Create one!</p>}
          {task.comments.map((comment) => (
            <article key={comment._id} className={styles.commentCard}>
              <header className={styles.commentHeader}>
                <p className={styles.commentAuthorInfo}>
                  {comment.author.username} posted on {new Date(comment.createdAt).toLocaleDateString()}
                </p>
                <div className={styles.commentActions}>
                  <p className={styles.commentText}>{comment.text}</p>
                  <div className={styles.commentButtons}>
                    {comment.author._id === user._id && (
                      <>
                        <Link to={`/tasks/${taskId}/comments/${comment._id}/edit`} className={`${styles.editTaskButton} ${styles.flipHorizontal}`}>✎</Link>
                        <button onClick={() => handleDeleteComment(comment._id)} className={styles.deleteTaskButton}>🗑</button>
                      </>
                    )}
                  </div>
                </div>
              </header>
            </article>
          ))}
          <hr />
          <h2>Add a checklist</h2>
          <CommentForm handleAddComment={handleAddComment} />
        </div>
      </section>
    </main>
  );
};

export default TaskDetails;