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

<<<<<<< HEAD
<<<<<<< HEAD
        <div className={styles.descriptionWrapper}>
          <p className={styles.description}>Description: {task.text}</p>
=======
        <div className={styles.descriptionWrapper}>
          <p className={styles.description}>Description: <span>{task.text}</span></p>
>>>>>>> aacd2b0eb4d678e8aac48bd47c2bce32edd7edbd
        </div>

        {task.author._id === user._id && (
          <div className={styles.actions}>
            <Link to={`/tasks/${taskId}/edit`} className={styles.editButton}>Edit Task</Link>
            <button onClick={() => props.handleDeleteTask(taskId)} className={styles.deleteButton}>Delete Task</button>
          </div>
        )}
      </div>

      <section className={styles.commentsSection}>
<<<<<<< HEAD
        <h2>Comments</h2>
        <CommentForm handleAddComment={handleAddComment} />
        {!task.comments.length && <p>No comments yet. Create one!</p>}
        <hr />
        {task.comments.map((comment) => (
          <article key={comment._id} className={styles.commentCard}>
            <header className={styles.commentHeader}>
              <p className={styles.commentAuthorInfo}>
                {comment.author.username} posted on {new Date(comment.createdAt).toLocaleDateString()}
              </p>
            </header>
            <div className={styles.commentActions}>
              <p className={styles.commentText}>Comment: {comment.text}</p>
              <div className={styles.commentButtons}>
                {comment.author._id === user._id && (
                  <>
                    <Link to={`/tasks/${taskId}/comments/${comment._id}/edit`} className={styles.editTaskButton}>Edit</Link>
                    <button onClick={() => handleDeleteComment(comment._id)} className={styles.deleteTaskButton}>Delete</button>
                  </>
                )}
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
=======
              {task.author._id === user._id && (
                <div className={styles.taskActions}>
                  <Link to={`/tasks/${taskId}/edit`}>
                    <MDBBtn color="warning" size="sm">Edit Task</MDBBtn>
                  </Link>
                  <MDBBtn
                    color="danger"
                    size="sm"
                    onClick={() => props.handleDeleteTask(taskId)}
                  >
                    Delete Task
                  </MDBBtn>
                </div>
              )}

              <section className={styles.commentsSection}>
                <MDBTypography tag="h4" className="mt-5 mb-4">Tasks</MDBTypography>
                <CommentForm handleAddComment={handleAddComment} />
                {!task.comments.length && <p>No Tasks yet. Add one below!</p>}
                {task.comments.map((comment) => (
                  <MDBCard className="mb-3" key={comment._id}>
                    <MDBCardBody>
                      <MDBRow className="d-flex justify-content-between">
                        <MDBCol>
                          <p className="font-weight-bold">{comment.author.username}</p>
                          <p className="text-muted">{new Date(comment.createdAt).toLocaleDateString()}</p>
                        </MDBCol>
                        <MDBCol md="auto" className="text-end">
                          {comment.author._id === user._id && (
                            <div>
                              <Link to={`/tasks/${taskId}/comments/${comment._id}/edit`}>
                                <MDBBtn color="warning" size="sm" className="me-2">Edit</MDBBtn>
                              </Link>
                              <MDBBtn color="danger" size="sm" onClick={() => handleDeleteComment(comment._id)}>Delete</MDBBtn>
                            </div>
                          )}
                        </MDBCol>
                      </MDBRow>
                      <p>{comment.text}</p>
                    </MDBCardBody>
                  </MDBCard>
                ))}
              </section>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
>>>>>>> c7d7198cbbf560ea7a0a0e636fc2ec645f01c071
=======
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
>>>>>>> aacd2b0eb4d678e8aac48bd47c2bce32edd7edbd
  );
};

export default TaskDetails;