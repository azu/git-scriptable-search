// LICENSE : MIT
"use strict";
import React from "react"
import BaseComponent from "./BaseComponent"
export default class SearchBar extends BaseComponent {
    handleChange(event) {
        var userInput = event.target.value;
        this.props.handleInputChange(userInput);
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    render() {
        return <div className="SearchBar">
            <form className="pure-form" onSubmit={this.handleSubmit.bind(this)}>
                <fieldset>
                    <div className="pure-control-group">
                        <label>
                            Filter:
                        </label>
                        <input className="user-filter-input pure-input-1-2" type="text" defaultValue=""
                               placeholder="filter word"
                               onChange={this.handleChange.bind(this)}/>
                    </div>
                </fieldset>
            </form>
        </div>;
    }
}
