import React from 'react';
import './components.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

export const SearchBox = () => {
  return ( 
    <div className="search-box">
        <div className="movie-title">
            Movie Title
        </div>
        <div className="search-bar">
          <input type="text"/>
          <FontAwesomeIcon icon={faSearch} className="search-icon" styles="color: blue;"/>
        </div>
    </div>
  )
}

export const ResultBox = () => {
  return (
    <div className="result-box">
      
    </div>
  )
}