import React, { Component } from 'react';
import 'milligram/dist/milligram.min.css'

class App extends Component{

state = {
  time:'',
  task:'',
  status:'',
  journal: []  
}

onInputChange = (inputKeys) =>{
  this.setState({ [inputKeys.target.name]:inputKeys.target.value });
  console.log(inputKeys.target.value)
}

//view
handleTableClick = (index) => {
  // access to e.target here
  const selectedTime = this.state.journal[index].time
  const selectedTask = this.state.journal[index].task

  this.setState({time: selectedTime})
  this.setState({task: selectedTask})
}

//delete
handleDeleteClick = (index) => {
  // access to e.target here
  this.setState({
    journal: this.state.journal.filter((_, i) => i !== index)
  });
}

//add
add(){
const time = this.state.time
const task = this.state.task
const newRecord = this.state.journal
newRecord.push({time:time, task:task, status: 'pending'})
this.setState({
  journal: newRecord
})
}

//update
handleStatusClick = (index) => {
  const newStatus = this.state.journal
  
  if (newStatus[index].status == 'pending')
  newStatus[index].status = 'complete'
  else
  newStatus[index].status = 'pending'

  this.setState({journal:newStatus})
}

renderForm () {
  return <div>  
    <fieldset>
    <label>Time</label>
    <input 
      type='text'
      onChange={(event)=>{this.onInputChange(event)}}
      className='form-control'
      name='time'
      value={this.state.time}/>
    <label>Task</label>
    <input 
      type='text'
      onChange={(event)=>{this.onInputChange(event)}}
      className='form-control'
      name='task'
      value={this.state.task} />
    <button onClick={()=>{this.add()}}>
      Add
    </button>
    </fieldset>
  </div>
}

renderTable () { 
  return <div>
    <table className='table'>
      <thead>
        <tr>
          <th>Time</th>
          <th>Task</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {
          this.state.journal.map( (row, index) => {
            return <tr key={index} id={index}>
              <td><a href='#' onClick={(e) => this.handleTableClick(index)}>{row.time}</a></td>
              <td>{row.task}</td>
              <td><a href='#' onClick={(e) => this.handleStatusClick(index)}>{row.status} </a></td>
              <td><input class="button-outline" type="submit" value="Delete" onClick={(e) => this.handleDeleteClick(index)} /></td>
            </tr>
          })
        }
      </tbody>
    </table>
  </div>
}


render () {
  return <div className='container'>
      <div className='jumbotron'>
      <h1>Self Journal</h1>
        {this.renderForm()}
        {this.renderTable()}
      </div>
    </div>
}

}

export default App