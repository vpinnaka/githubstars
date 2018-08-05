import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

var apiurl = 'https://api.github.com/users/'

class App extends Component {
	constructor(props){
		super(props);

		this.state = {
			username: '',
			stars: []
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.getStars = this.getStars.bind(this);
	}

	handleChange(event){
		var value = event.target.value;
		this.setState({username: value});
	}

	handleSubmit(event){
		event.preventDefault();
		//console.log(this.state);
		this.getStars(this.state.username);
	}

	getStars(username){
		axios.get(`${apiurl}${username}/starred`)
			.then(response => this.setState({
				stars: response.data
			}))
			.catch(e => console.log(e));
	}

	componentDidMount(){
		this.getStars(this.state.username);
	}
	render() {
		return (
		<div className='App-container'>
			<form className='App-form' onSubmit={this.handleSubmit}>
				<input
					id='username'
					placeholder='github username'
					type='text'
					value={this.state.username}
					autoComplete='off'
					onChange={this.handleChange}
				/>
				<button
					className='App-button'
					type='submit'
					disabled={!this.state.username}
				>
					Submit
				</button>
			</form>
			{this.state.stars.map(data => <p><strong>{data.name}</strong>{data.language}</p>)}
		</div>
		);
	}
}

export default App;
