import React from 'react'
import toDoList, {addTask, onChange, clear, filter, deleteTask, updateAfterDelete} from '../state/toDoList'
import {connect} from 'react-redux'
import {ListItem} from 'material-ui/List'
import {Grid, Row, Col} from 'react-flexbox-grid'

import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper'


const Tasks = (props) => (
    <div>
        <Row around={'xs'}>
            <Col md={4}>
                <TextField
                    name={'TASKS'}
                    fullWidth={true}
                    placeholder={'TASKS'}
                    onChange={props.onChange}
                    value={props.newText}
                    onKeyPress={(ev) => {
                        if ((ev.key === 'Enter') && (props.newText !== '')) {
                            props.addTask()
                            props.clear()
                        }
                    }
                    }
                />
            </Col>
            <Col center={'true'}>
                <RaisedButton
                    label={'ADD TASK'}
                    backgroundColor={'#2196F3'}
                    onClick={() => {
                        if (props.newText !== '') {
                            props.addTask()
                            props.clear()
                        }
                        else {
                            alert('oops! you try to add empty task')
                        }
                    }
                    }
                />
            </Col>
            <Col md={4}>
                <TextField
                    name={'filterTasks'}
                    placeholder={'FIND TASK'}
                    onChange={props.filter}
                    value={props.newFilter}
                />
            </Col>
        </Row>
        <Paper>
            <ul>
                {
                    props.tasks
                        .filter(task => (task.toLowerCase().indexOf(props.newFilter.toLowerCase()) !== -1))
                        .map((task, i) => (
                                <ListItem key={i}>
                                    <Row middle="xs">
                                        <Col xs={6}>
                                            {task}
                                        </Col>
                                        <Col xs={6}>
                                            <RaisedButton
                                                label={'DELETE TASK'}
                                                backgroundColor={'#F44336'}
                                                onClick={() => {
                                                    props.deleteTask(i)
                                                    props.updateAfterDelete()
                                                    alert('DELETE TASK')
                                                }
                                                }
                                            />
                                        </Col>
                                    </Row>
                                </ListItem>
                            )
                        )
                }
            </ul>

            </Paper>
    </div>
)
const mapStateToProps = state => ({
    tasks: state.todoList.tasks,
    newText: state.todoList.newText,
    newFilter: state.todoList.newFilter,
})

const mapDispatchToProps = dispatch => ({
    onChange: (ev, newValue) => dispatch(onChange(newValue)),
    filter: (ev, newValue) => dispatch(filter(newValue)),
    addTask: () => dispatch(addTask()),
    clear: () => dispatch(clear()),
    deleteTask: (index) => dispatch(deleteTask(index)),
    updateAfterDelete: () => dispatch(updateAfterDelete()),

})


export default connect(
mapStateToProps,
mapDispatchToProps
)(Tasks)