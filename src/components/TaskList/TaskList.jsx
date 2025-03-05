import { Link } from 'react-router-dom';
import styles from './TaskList.module.css';
import { AuthedUserContext } from '../../App';
import { useContext } from 'react';


const TaskList = (props) => {
   const user = useContext(AuthedUserContext);
  return (
    <div className={styles.board}>
      {props.tasks && props.tasks.length > 0 ? (
        props.tasks.map((task) => (
         <div key={task._id}
          // className={styles.taskCard}
           
          className={`${styles.taskCard} ${
            task.author._id === user._id ? styles.ownerTask : ""
          }`}
            
          >
            <header className={styles.cardHeader} 
            
            >
           
              <h3>{task.title}</h3>
              <p className={styles.taskInfo}>
                {task.author.username} posted on{' '}
                {new Date(task.createdAt).toLocaleDateString()}
              </p>
            </header>
            <div className={styles.cardBody}>
              <p>{task.text}</p>
            </div>
            <footer className={styles.cardFooter}>
              <Link to={`/tasks/${task._id}`} className={styles.showMoreButton}>
                Show More
              </Link>
            </footer>
          </div>
        ))
      ) : (
        <p>No tasks available</p>
      )}
    </div>
  );
};

export default TaskList;