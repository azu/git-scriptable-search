// LICENSE : MIT
"use strict";
import React from "react"
import BaseComponent from "./BaseComponent"
export default class GitInputBar extends BaseComponent {
    handleSubmit(event) {
        event.preventDefault();
        var userInput = React.findDOMNode(this.refs.gitDir).value.trim();
        this.props.handleGitDir(userInput);
    }

    render() {
        return <div className="SearchBar">
            <form className="pure-form" onSubmit={this.handleSubmit.bind(this)}>
                <fieldset>
                    <div className="pure-control-group">
                        <label>
                            Git directory :
                        </label>
                        <input className="user-filter-input pure-input-1-2" type="text"
                               defaultValue=""
                               placeholder="/path/to/dir/.git"
                               ref="gitDir"/>
                    </div>
                </fieldset>
            </form>
        </div>;
    }
}
