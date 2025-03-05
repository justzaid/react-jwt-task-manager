import { Link } from 'react-router-dom';
import styles from './TaskList.module.css';
import { AuthedUserContext } from '../../App';
import { useContext } from 'react';

const TaskList = (props) => {
  const user = useContext(AuthedUserContext);

  const taskCategories = {
    'Not started': [],
    'In process': [],
    'Done': []
  };

  props.tasks?.forEach((task) => {
    taskCategories[task.category]?.push(task);
  });

  return (
    <div className={styles.pageWrapper}>
      {/* "Your Tasks" Header Section */}
      <div className={styles.pageHeader}>
        <h1>Team Dashboard</h1>
      </div>

      {/* Task columns */}
      <div className={styles.board}>
        <div className={styles.column}>
          <div className={styles.columnHeader}>Not Started</div>
          <div className={styles.taskContainer}>
            {taskCategories['Not started']?.map((task) => (
              <div
                key={task._id}
                className={`${styles.taskCard} ${
                  task.author._id === user._id ? styles.ownerTask : ''
                }`}
              >
                <header className={styles.cardHeader}>
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
            ))}
          </div>
        </div>

        <div className={styles.column}>
          <div className={styles.columnHeader}>In Process</div>
          <div className={styles.taskContainer}>
            {taskCategories['In process']?.map((task) => (
              <div
                key={task._id}
                className={`${styles.taskCard} ${
                  task.author._id === user._id ? styles.ownerTask : ''
                }`}
              >
                <header className={styles.cardHeader}>
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
            ))}
          </div>
        </div>

        <div className={styles.column}>
          <div className={styles.columnHeader}>Done</div>
          <div className={styles.taskContainer}>
            {taskCategories['Done']?.map((task) => (
              <div
                key={task._id}
                className={`${styles.taskCard} ${
                  task.author._id === user._id ? styles.ownerTask : ''
                }`}
              >
                <header className={styles.cardHeader}>
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskList;
