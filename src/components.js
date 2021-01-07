import React from 'react';
import './components.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const API_KEY = process.env.REACT_APP_API_KEY;

const SearchBox = props => {
	const { onChange } = props;

	const onInputChange = event => {
		onChange(event.target.value);
	};

	return (
		<div className='search-box'>
			<div className='movie-title'>Movie Title</div>
			<div className='search-bar'>
				<input type='text' onInput={onInputChange} />
				<FontAwesomeIcon
					icon={faSearch}
					className='search-icon'
					styles='color: blue;'
				/>
			</div>
		</div>
	);
};

function displayMovies(data, clickHandler, nominations) {
	if (data) {
		return (
			<ul>
				{data.map((movie, index) => (
					<li key={index}>
						{movie.title} ({movie.year})
						<NominateButton
							index={index}
							isNomination={checkIfNominee(
								movie.title,
								movie.year,
								nominations
							)}
							clickHandler={clickHandler}
						/>
					</li>
				))}
			</ul>
		);
	}
}

function checkIfNominee(title, year, nominations) {
	return nominations.some(
		nominee => nominee.title === title && nominee.year === year
	);
}

const ResultBox = props => {
	const {
		searchBarText,
		movieResults,
		errorMessage,
		updateNominations,
		nominations,
	} = props;

	const clickHandler = (event, movieIndex) => {
		const movie = movieResults[movieIndex];
		event.target.disabled = true;
		updateNominations(true, movie, nominations);
	};
	return (
		<div className='result-box'>
			<div>Results for "{searchBarText}"</div>
			{errorMessage
				? errorMessage
				: displayMovies(movieResults, clickHandler, nominations)}
		</div>
	);
};

const NominateButton = props => {
	const { index, isNomination, clickHandler } = props;
	if (isNomination) {
		return (
			<button
				className='nominate-button'
				onClick={e => clickHandler(e, index)}
				disabled={true}
			>
				NOMINATE
			</button>
		);
	} else {
		return (
			<button className='nominate-button' onClick={e => clickHandler(e, index)}>
				NOMINATE
			</button>
		);
	}
};

function displayNominations(nominations, removeNomination) {
	if (nominations.length > 0) {
		return (
			<ul>
				{nominations.map((movie, index) => (
					<li key={index}>
						{movie.title} ({movie.year})
						<button
							className='nominate-button'
							onClick={() => removeNomination(index)}
						>
							REMOVE
						</button>
					</li>
				))}
			</ul>
		);
	}
}

const NominationBox = props => {
	const { nominations, updateNominations } = props;

	const removeNomination = index => {
		const nominee = nominations[index];
		updateNominations(false, nominee);
	};

	return (
		<div className='nomination-box'>
			<div>Nominations</div>
			{displayNominations(nominations, removeNomination)}
		</div>
	);
};

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
    this.state.nominations.map(item => console.log(item));
    console.log(` noms:: ${this.state.nominations}`);
	};

	updateResults = newText => {
		this.setState({ searchBarText: newText });
	};

	async componentDidUpdate(prevProps, prevState) {
		if (prevState.searchBarText !== this.state.searchBarText) {
			// need prevProps to ensure only one API call is made per render update
			const title = this.state.searchBarText.trim(); //callback only on state change to prevent infinite loop

			if (!(title === '')) {
				const url = `http://www.omdbapi.com/?apikey=${API_KEY}&s=${title}&type=movie`;
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
				<SearchBox onChange={this.updateResults} />
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
			</div>
		);
	}
}
