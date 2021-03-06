// LICENSE : MIT
"use strict";
import React from "react"
import BaseComponent from "./BaseComponent"
import {GitLogList} from "./GitLogList"
import SearchBar from "./SearchBar"
import SearchScriptBar from "./SearchScriptBar"
import GitInputBar from "./GitInputBar"
export default class AppComponent extends BaseComponent {
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

    handleScriptChange(script) {
        this.gitAction.filterByScript(script);
    }

    handleGitDir(gitDir) {
        this.gitAction.loadGitPath(gitDir);
    }

    render() {
        return <div className="AppComponent">
            <GitInputBar handleGitDir={this.handleGitDir.bind(this)}/>
            <SearchScriptBar handleInputChange={this.handleScriptChange.bind(this)}/>
            <SearchBar handleInputChange={this.handleInputChange.bind(this)}/>
            <GitLogList commits={this.state.commits}/>
        </div>
    }
}