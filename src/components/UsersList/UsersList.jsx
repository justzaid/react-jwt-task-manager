import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as taskService from '../../services/taskService';
import styles from './UsersList.module.css';

const UsersList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const usersData = await taskService.getAllUsers();
            setUsers(usersData);
        };
        fetchUsers();
    }, []);

    return (
        <main className={styles.container}>
            <h1>All Users</h1>
            <ul>
                {users.map((user) => (
                    <li key={user._id}>
                        <Link to={`/users/${user._id}/tasks`}>{user.username}</Link>
                    </li>
                ))}
            </ul>
        </main>
    );
};

export default UsersList;
