import { useParams, Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import * as taskService from '../../services/taskService';
import CommentForm from '../CommentForm/CommentForm';
import { AuthedUserContext } from '../../App';
import {
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBBtn,
  MDBBadge,
  MDBRow,
  MDBCol,
  MDBContainer,
  MDBTypography
} from 'mdb-react-ui-kit';
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

  return (
    <MDBContainer className="py-5">
      <MDBRow className="d-flex justify-content-center align-items-center">
        <MDBCol md="12" xl="10">
          <MDBCard className={styles.taskCard}>
            <MDBCardHeader className="bg-dark text-white">
              <h5 className="mb-0">{task.title}</h5>
              <p className="mb-0">
                <MDBBadge color="secondary">{task.category.toUpperCase()}</MDBBadge>
              </p>
            </MDBCardHeader>
            <MDBCardBody>
              <MDBTypography tag="h6" className="text-muted mb-3">
                Posted by {task.author.username} on {new Date(task.createdAt).toLocaleDateString()}
              </MDBTypography>
              <p>{task.text}</p>

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
  );
};

export default TaskDetails;
