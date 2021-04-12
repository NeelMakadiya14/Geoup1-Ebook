const Task = ({ task }) => {
  return (
    <div>
      <h3>{task.name}{' '}</h3>
      <p> {task.comm}</p>
    </div>
  )
}

export default Task
