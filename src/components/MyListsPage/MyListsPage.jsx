import { useContext, useState, useEffect } from 'react';
import { AuthedUserContext } from '../../App';
import { Link } from 'react-router-dom';
import * as taskService from '../../services/taskService';
import styles from './MyListsPage.module.css';

const MyListsPage = () => {
  const [tasks, setTasks] = useState([]);
  const user = useContext(AuthedUserContext);

    useEffect(() => {
        const fetchUserTasks = async () => {
            try {
                const allTasks = await taskService.getTasks(); // Assuming you have a function to get tasks
                console.log('All tasks:', allTasks);
                const userTasks = allTasks.filter(task => task.author._id === user._id);
                console.log('User tasks:', userTasks);
                setTasks(userTasks);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

    if (user) {
      fetchUserTasks();
    }
  }, [user]);

  const taskCategories = {
    'Not started': [],
    'In process': [],
    'Done': []
  };

  tasks.forEach((task) => {
    if (taskCategories[task.category]) {
      taskCategories[task.category].push(task);
    }
  });

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.pageHeader}>
        <h1>Your Tasks</h1>
      </div>

      <div className={styles.board}>

        {Object.keys(taskCategories).map((category) => (
          <div key={category} className={styles.column}>
            <div className={styles.columnHeader}>{category}</div>
            <div className={styles.taskContainer}>
              {taskCategories[category]?.length > 0 ? (
                taskCategories[category].map((task) => (
                  <div
                    key={task._id}
                    className={`${styles.taskCard} ${task.author._id === user._id ? styles.ownerTask : ''}`}
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
                ))
              ) : (
                <p>No Checklists in this category.</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyListsPage;
