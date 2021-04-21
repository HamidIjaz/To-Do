import { useState } from 'react'

const AddTask = ({onAdd}) => {
    const [text, setText] = useState('')
    const [day, setDay] = useState('')
    const [reminder, setReminder] = useState(false)

    const onSubmit=(e)=>{
        e.preventDefault()

        if(! text)
        {
            alert('please add task')
            return
        }
        onAdd({text,day,reminder})

        setText('')
        setDay('')
        setReminder(false)

    }
    return (
        <form className='add-form' onSubmit={onSubmit}>
            <div className='form-control'>
                <label>Add Task</label>
                <input type='text' placeholder='Add Task' value={text} onChange={(e)=>setText(e.target.value)}></input>
            </div>
            <div className='form-control'>
                <label>Add day and time</label>
                <input type='text' placeholder='Add day and time' value={day} onChange={(e)=>setDay(e.target.value)}></input>
            </div>
            <div className='form-control form-control-check'>
                <label>Set Reminder</label>
                <input type='checkbox' checked={reminder} value={reminder} onChange={(e)=>setReminder(e.currentTarget.checked)}/>
            </div>
            <input type='submit' value='Save Task' className='btn btn-block'></input>
        </form>
    )
}

export default AddTask