import React, { Component } from 'react';
import CardList from './CardList'
import SearchBox from './SearchBox';
import "./App.css"
import Scroll from './Scroll';

class App extends Component {
    constructor() {
        super()
        this.state = {
            robots: [],
            searchfield: ''
        }
    }
    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => this.setState({ robots: users}));
    }

    onSearhChange = (event) => {
        this.setState({ searchfield: event.target.value})
    }
    render() {
        const {robots, searchfield} = this.state
        const filteredRobotsNames = robots.filter(robot =>{
            return robot.name.toLocaleLowerCase().includes(searchfield.toLocaleLowerCase());
        })
        if (robots.length === 0) {
            return <h1>Loading</h1>
        }
        return (
            <div className='tc f4'>
                <h1>RoboFriends</h1>
                <SearchBox searchChange={this.onSearhChange} />
                <Scroll>
                    <CardList robots={filteredRobotsNames} />
                </Scroll>
            </div>
        );
    }

}

export default App;