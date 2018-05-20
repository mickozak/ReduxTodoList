import React, {Component} from 'react';
import Tasks from './components/ToDoList'

import AppBar from 'material-ui/AppBar'


class App extends Component {
    render() {
        return (
            <div>
                <AppBar title ="TODO LIST"
                        showMenuIconButton={false}
                        style={{backgroundColor: '#2196F3', marginBottom: '60px'}}
                />
                <Tasks/>
            </div>
        )
    }
}

export default App;
