import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './style.css'
//import Header from './components/Header'
import Tasks from './Tasks'
import Comment from './Comment'
//import About from './components/About'
import { Cookies } from 'react-cookie'
const cookies = new Cookies();
const email = cookies.get('userCookie').Email;
const googleToken = cookies.get('userCookie').Token;
let name, userId, username;

export default function Comments(props) {
  //const [showAddTask, setShowAddTask] = useState(true)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    if (cookies.get('userDetails')) {
      name = cookies.get('userDetails').name;
      //userId = cookies.get('userDetails')._id;
      username = cookies.get('userDetails').username;
    }
    getTasks()
  }, [])

  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch('https://e-book-backend.herokuapp.com/addcomment')
    const data = await res.json()

    return data
  }

  // Add Task
  const addTask = async (task) => {
    const res = await fetch('https://e-book-backend.herokuapp.com/addcomment', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(task),
    })

    const data = await res.json()

    setTasks([...tasks, data])

  }

  // Delete Task
  /*const deleteTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',
    })
    //We should control the response status to decide if we will change the state or not.
    res.status === 200
      ? setTasks(tasks.filter((task) => task.id !== id))
      : alert('Error Deleting This Task')
  }*/



  return (
    <Router>
      <div className='container'>
        <h1>Comments</h1>

        <>
          <Comment onAdd={addTask} name={name} username={username} props={props} />
          {tasks.length > 0 ? (
            <Tasks
              tasks={tasks}
            />
          ) : (
            'No Comments'
          )}
        </>

      </div>
    </Router>
  )
}
