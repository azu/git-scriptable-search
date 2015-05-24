// LICENSE : MIT
"use strict";
import React from "react"
export default class SearchBar extends React.Component {
    handleChange(event) {
        var userInput = event.target.value;
        this.props.handleInputChange(userInput);
    }

    render() {
        return <div className="SearchBar">
            <form className="pure-form pure-form-aligned">
                <fieldset>
                    <div class="pure-control-group">
                        <label>
                            Filter: <input className="user-filter-input pure-input-1-2" type="text" defaultValue=""
                                           onChange={this.handleChange.bind(this)}/>
                        </label>
                    </div>
                </fieldset>
            </form>
        </div>;
    }
}
