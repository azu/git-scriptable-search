// LICENSE : MIT
"use strict";
import React from "react"
import {GitLogList} from "./GitLogList"
import SearchBar from "./SearchBar"
export default class AppComponent extends React.Component {
    constructor(props) {
        super(props);
        this.gitStore = props.context.gitStore;
        this.gitAction = props.context.gitAction;
        this.state = {
            commits: this.gitStore.getCommits()
        };
        this.onChange = this._onGitChange.bind(this);
    }

    componentWillMount() {
        this.gitStore.onChange(this.onChange);
    }

    componentWillUnmount() {
        this.gitStore.removeChangeListener(this.onChange);
    }

    _onGitChange() {
        this.setState({
            commits: this.gitStore.getCommits()
        });
    }

    handleInputChange(string) {
        this.gitAction.filterByString(string);
    }

    render() {
        return <div className="AppComponent">
            <SearchBar handleInputChange={this.handleInputChange.bind(this)}/>
            <GitLogList commits={this.state.commits}/>
        </div>
    }
}