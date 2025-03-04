import { Link } from 'react-router-dom';
import styles from './TaskList.module.css';  // Make sure to create a CSS module for styling

const TaskList = (props) => {
  return (
    <main className={styles.container}>
      {props.tasks.map((task) => (
        <Link key={task._id} to={`/tasks/${task._id}`} className={styles.taskCard}>
          <article className={styles.card}>
            <header className={styles.cardHeader}>
              <h2>{task.title}</h2>
              <p className={styles.taskInfo}>
                {task.author.username} posted on{' '}
                {new Date(task.createdAt).toLocaleDateString()}
              </p>
            </header>
            <div className={styles.cardBody}>
              <p>{task.text}</p>
              {/* Optional: You can add labels here */}
              <div className={styles.labels}>
                <span className={styles.label}>To Do</span>
              </div>
            </div>
          </article>
        </Link>
      ))}
    </main>
  );
};

export default TaskList;
