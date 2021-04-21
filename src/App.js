import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import Footer from './components/Footer'
import About from './components/About'

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTask] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTask(tasksFromServer)
    }
    getTasks()
  }, [])

  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()
    return data
  }

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()
    return data
  }

  const Add = async (task) => {
    const res = await fetch('http://localhost:5000/tasks',
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(task),
      }
    )
    const data = await res.json()

    setTask([...tasks, data])
  }

  const reminderTask = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updateTask = { ...taskToToggle, reminder: !taskToToggle.reminder }
    
    const res= await fetch(`http://localhost:5000/tasks/${id}`,
    {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updateTask),
    }
    )
    const data= await res.json()

    setTask(tasks.map((task) => task.id === id ? { ...task, reminder: data.reminder } : task))
  }

  const deleteTask = async (id) => {
    await fetch(
      `http://localhost:5000/tasks/${id}`,
      {
        method: 'DELETE',
      }
    )
    setTask(tasks.filter((task) => task.id !== id))
  }

  return (
    <Router>
      
      <div className="Container">
      <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />            
        <Route path='/' exact render={
          () => (
            <>
              {showAddTask && <AddTask onAdd={Add} />}
              {tasks.length > 0 ? <Tasks tasks={tasks}
                onDelete={deleteTask} onToggle={reminderTask} /> : ('No Tasks to show')}
              <Footer />
            </>
          )
        } />
        
        <Route path='/about' component={About} />                
        
    </div>
    </Router>
  );
}
export default App;