import React from 'react';
import SearchBar from './SearchBar';
import './css/Header.css';

export default class Header extends React.Component{
    render(){
        return(
            <React.Fragment>
                <header className="top-menu">
                    <div>
                        <p>Monday, 3 June 2019</p>
                    </div>
                    <SearchBar onKeyUp = {this.props.onKeyUp} 
                        onClick = {this.props.onClick}/>
                </header> 
                <div className="bottom-line">
                    <p></p>
                </div>
                <div>
                    <h1 className="title">HELLO WORLD</h1>
                </div>
                <div className="subtitle">
                    <h2>Newspaper/ Magazine /Publisher</h2>
                </div>
            </React.Fragment>
        )
    }
}