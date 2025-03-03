import { useState, createContext, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

// Components
import NavBar from './components/NavBar/NavBar';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import SignupForm from './components/SignupForm/SignupForm';
import SigninForm from './components/SigninForm/SigninForm';
import TaskForm from './components/TaskForm/TaskForm';
import TaskList from './components/TaskList/TaskList';
import TaskDetails from './components/TaskDetails/TaskDetails';
import CommentForm from './components/CommentForm/CommentForm';
// Services
import * as authService from '../src/services/authService';
import * as taskService from './services/taskService';

export const AuthedUserContext = createContext(null);

const App = () => {
  const [user, setUser] = useState(authService.getUser()); // using the method from authservice
  const [tasks, setTasks] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllTasks = async () => {
      const tasksData = await taskService.index();
      setTasks(tasksData)
    }
    if (user) fetchAllTasks()
  }, [user])

  const handleSignout = () => {
    authService.signout();
    setUser(null);
  };

  const handleAddTask = async (taskFormData) => {
    const newTask = await taskService.create(taskFormData);
    const newTaskList = [newTask, ...tasks]
    setTasks(newTaskList);
    navigate('/tasks');
  };

  const handleUpdateTask = async (taskId, taskFormData) => {
    const updatedTask = await taskService.update(taskId, taskFormData);

    setTasks(tasks.map((task) => (taskId === task._id ? updatedTask : task)));

    navigate(`/tasks/${taskId}`);
  };

  const handleDeleteTask = async (taskId) => {
    const deletedTask = await taskService.deleteTask(taskId);
    setTasks(tasks.filter((task) => task._id !== deletedTask._id));
    navigate('/tasks');
  };

  return (
    <>
      <AuthedUserContext.Provider value={user}>
        <NavBar user={user} handleSignout={handleSignout} />
        <Routes>
          {user ? (
            // protected
            <>
              <Route path="/" element={<Dashboard user={user} />} />
              <Route path="/tasks" element={<TaskList tasks={tasks} />} />
              <Route path="/tasks/:taskId" element={<TaskDetails handleDeleteTask={handleDeleteTask} />} />
              <Route path="/tasks/new" element={<TaskForm handleAddTask={handleAddTask} />} />
              <Route path="/tasks/:taskId/edit" element={<TaskForm handleUpdateTask={handleUpdateTask} />} />
              <Route path="/tasks/:taskId/comments/:commentId/edit" element={<CommentForm />} />
            </>
          ) : (
            // Public
            <Route path="/" element={<Landing />} />
          )}
          <Route path="/signup" element={<SignupForm setUser={setUser} />} />
          <Route path="/signin" element={<SigninForm setUser={setUser} />} />
        </Routes>
      </AuthedUserContext.Provider>
    </>
  );
};

export default App;
