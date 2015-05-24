// LICENSE : MIT
"use strict";
import React from "react"
export default class GitInputBar extends React.Component {
    handleSubmit(event) {
        event.preventDefault();
        var userInput = React.findDOMNode(this.refs.gitDir).value.trim();
        this.props.handleGitDir(userInput);
    }

    render() {
        return <div className="SearchBar">
            <form className="pure-form pure-form-aligned" onSubmit={this.handleSubmit.bind(this)}>
                <fieldset>
                    <div class="pure-control-group">
                        <label>
                            Git directory : <input className="user-filter-input pure-input-1-2" type="text"
                                                   defaultValue=""
                                                   ref="gitDir"/>
                        </label>
                    </div>
                </fieldset>
            </form>
        </div>;
    }
}
