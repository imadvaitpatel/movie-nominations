import React from 'react';
import './components.css';
import Banner from './Banner.js';
import SearchBox from './SearchBox';
import ResultBox from './ResultBox';
import NominationBox from './NominationBox';

const API_KEY = process.env.NEXT_PUBLIC_REACT_APP_API_KEY;

export default class ParentContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			nominations: [],
			searchBarText: '',
			results: null,
			errorMessage: '',
		};
	}
	// update nominations when user clicks a button
	updateNominations = (nominate, movie) => {
		// either a movie is nominated or "unnominated"
		let newNominations = this.state.nominations;
		if (nominate) {
			newNominations.push(movie);
			this.setState({ nominations: newNominations });
		} else {
			const i = newNominations.indexOf(movie);
			newNominations.splice(i, 1); // remove the "unnominated movie"
			this.setState({ nominations: newNominations });
		}
	};
	// update search results when user types in search bar
	updateResults = newText => {
		this.setState({ searchBarText: newText });
	};

	async componentDidUpdate(prevProps, prevState) {
		// need prevProps argument to ensure only one API call is made per render update
		// callback only on state change to prevent infinite loop
		if (prevState.searchBarText !== this.state.searchBarText) {
			const title = this.state.searchBarText.trim();

			if (!(title === '')) {
				const url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${title}&type=movie`;
				const response = await fetch(url);
				const data = await response.json();

				if (!data.Search) {
					this.setState({ results: null, errorMessage: data.Error }); // data.Search is null if there is an error, display errorMessage.
				} else {
					const numMovies = data.Search.length;
					var movies = [];

					while (movies.length < Math.min(numMovies, 5)) {
						// display at most 5 results to users
						movies.push({
							title: data.Search[movies.length].Title,
							year: data.Search[movies.length].Year,
						});
					}
					this.setState({ results: movies, errorMessage: '' });
				}
			}
		}
	}

	render() {
		return (
			<div className='flex-container'>
				<div className='header'>The Shoppies</div>
				<SearchBox updateResults={this.updateResults} />
				<div className='results-container'>
					<ResultBox
						searchBarText={this.state.searchBarText}
						movieResults={this.state.results}
						errorMessage={this.state.errorMessage}
						updateNominations={this.updateNominations}
						nominations={this.state.nominations}
					/>
					<NominationBox
						nominations={this.state.nominations}
						updateNominations={this.updateNominations}
					/>
				</div>
				<Banner numberOfNominations={this.state.nominations.length} />
			</div>
		);
	}
}
