import React from 'react';
import './components.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchBox = (props) => {
  const {callback} = props;

  const onInputChange = (event) => {
    callback(event.target.value);
  }

	return (
		<div className='search-box'>
			<div className='movie-title'>Movie Title</div>
			<div className='search-bar'>
				<input type='text' onInput={onInputChange}/>
				<FontAwesomeIcon
					icon={faSearch}
					className='search-icon'
					styles='color: blue;'
				/>
			</div>
		</div>
	);
};

const ResultBox = (props) => {
  const {result} = props;
  console.log(`new result :: ${result}`);
  console.log(result);
	return (
		<div className='result-box'>
			<div>Results for "{result}"</div>
		</div>
	);
};

const NominationBox = () => {
	return (
		<div className='nomination-box'>
			<div>Nominations</div>
		</div>
	);
};

export default class ParentContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
      nominations: [],
      result: '',
    };
  }
  
  updateResults = (newResult) => {
    console.log(newResult);
    this.setState({result: newResult});
    console.log('updating');
  }

	render() {
		return (
			<div className='flex-container'>
				<div className='header'>The Shoppies</div>
				<SearchBox callback={this.updateResults}/>
				<div className='results-container'>
					<ResultBox result={this.state.result}/>
					<NominationBox />
				</div>
			</div>
		);
	}
}
