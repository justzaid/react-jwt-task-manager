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
                const allTasks = await taskService.getTasks();
                const userTasks = allTasks.filter(task => task.author._id === user._id);
                setTasks(userTasks);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        if (user) {
            fetchUserTasks();
        }
    }, [user]);

    return (
        <div className={styles.board}>
            <h2>Your Tasks</h2>
            {tasks && tasks.length > 0 ? (
                tasks.map((task) => (
                    <div key={task._id} className={styles.taskCard}>
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
                <p>No tasks available</p>
            )}
        </div>
    );
};

export default MyListsPage;