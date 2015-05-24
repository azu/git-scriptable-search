// LICENSE : MIT
"use strict";
import React from "react"
export default class SearchBar extends React.Component {
    handleChange(event) {
        var userInput = event.target.value;
        this.props.handleInputChange(userInput);
    }

    render() {
        return <input className="SearchBar" type="text" defaultValue="" onChange={this.handleChange.bind(this)}/>;
    }
}
