import { useState } from 'react'

const AddTask = ({ onAdd, name, userId, username, props }) => {
    //const [name, setName] = useState('')
    const [comm, setComm] = useState('')


    const onSubmit = (e) => {
        e.preventDefault()

        if (!comm) {
            alert('Please add a comment')
            return
        }

        onAdd({ comm, name, username, props.bookID })

        //setName('')
        setComm('')
    }

    return (
        <form className='add-form' onSubmit={onSubmit}>
            <div className='form-control'>
            </div>
            <div className='form-control'>
                <label>Comments</label>
                <input
                    type='text'
                    placeholder='Comment'
                    value={comm}
                    onChange={(e) => setComm(e.target.value)}
                />
            </div>
            <input type='submit' value='Add Comment' className='btn btn-block' />
        </form>
    )
}

export default AddTask
