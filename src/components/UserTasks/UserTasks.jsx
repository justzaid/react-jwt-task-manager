import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as taskService from '../../services/taskService';
import TaskList from '../TaskList/TaskList';

const UserTasks = () => {
    const { userId } = useParams();
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchUserTasks = async () => {
            const allTasks = await taskService.index();
            const userTasks = allTasks.filter((task) => task.author._id === userId);
            setTasks(userTasks);
        };
        fetchUserTasks();
    }, [userId]);

    return <TaskList tasks={tasks} />;
};

export default UserTasks;
