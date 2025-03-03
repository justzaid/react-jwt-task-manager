import { Link } from 'react-router-dom';

const TaskList = (props) => {
    return (
        <main>
          {props.tasks.map((task) => (
            <Link key={task._id} to={`/tasks/${task._id}`}>
              <article>
                <header>
                  <h2>{task.title}</h2>
                  <p>
                    {task.author.username} posted on 
                    {new Date(task.createdAt).toLocaleDateString()}
                  </p>
                </header>
                <p>{task.text}</p>
              </article>
            </Link>
          ))}
        </main>
      );
  };
  
  export default TaskList;