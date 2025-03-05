import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthedUserContext } from '../../App';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const user = useContext(AuthedUserContext);
  const navigate = useNavigate();


  const handleNavigateToTasks = () => {
    navigate("/tasks");
  };

  const handleNavigateToNewTask = () => {
    navigate("/tasks/new");
  };

  return (
    <main className={styles.dashboardContainer}>
      <div className={styles.greetingCard}>
        <h1 className={styles.welcomeMessage}>Welcome, {user.username}!</h1>
        <p className={styles.dashboardIntro}>
          This is your personal dashboard. Here, you can view all your tasks, manage them, and more. Keep track of your progress and stay organized!
        </p>
      </div>

      <section className={styles.featuresSection}>
        <h2 className={styles.sectionTitle}>Your Quick Actions</h2>
        <div className={styles.actionsWrapper}>
          <div className={styles.actionCard}>
            <h3 className={styles.cardTitle}>View Tasks</h3>
            <p className={styles.cardDescription}>Access all your current and past tasks quickly and easly.</p>
            <button onClick={handleNavigateToTasks} className="btn btn-primary">
              View Tasks
            </button>
          </div>

          <div className={styles.actionCard}>
            <h3 className={styles.cardTitle}>Create New Task</h3>
            <p className={styles.cardDescription}>Easily create new tasks to manage your day-to-day activities.</p>
            <button onClick={handleNavigateToNewTask} className="btn btn-success">
              Create New Task
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
