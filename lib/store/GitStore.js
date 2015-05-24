// LICENSE : MIT
"use strict";
import {Store} from "material-flux"
import {keys} from "../action/GitAction"
import {getAllHistoryAsync} from "../git/history"
import stringToRegExp from "string-to-regexp"

function filterByRegExp(commits, regExp) {
    return commits.filter(function (commit) {
        return regExp.test(commit.message());
    });
}
export default class GitStore extends Store {
    constructor(...args) {
        super(...args);
        this.state = {
            repository: null,
            commits: [],
            filteredCommits: [],
            filterRegExp: null,
            filterScript: ""
        };
        this.register(keys.loadGitPath, this.onLoadGitPath.bind(this));
        this.register(keys.filterByString, this.onFilterByString.bind(this));
        this.register(keys.filterByScript, this.onFilterByScript.bind(this));
    }

    getCommits() {
        return this.state.filteredCommits;
    }

    onFilterByString(string) {
        if (string == null || string.length === 0) {
            this.setState({
                filterRegExp: null,
                filteredCommits: this.state.commits
            });
            return
        }
        var regExp = stringToRegExp(string);
        if (regExp) {
            this.setState({
                filterRegExp: regExp,
                filteredCommits: filterByRegExp(this.state.commits, regExp)
            });
        }
    }

    onFilterByScript(script) {
        var vm = require("vm");
        this.state.filteredCommits = [];
        var sandbox = {
            console: console,
            nodegit: require("nodegit"),
            repository: this.state.repository,
            commits: this.state.commits,
            pushCommit: (commit)=> {
                var commits = this.state.filteredCommits;
                commits.push(commit);
                this.setState({
                    filteredCommits: commits
                })
            },
            done: (error) => {
                if (error instanceof Error) {
                    console.error(error);
                    return
                }
                var filteredCommits = error;
                this.setState({
                    filterScript: script,
                    filteredCommits: filteredCommits
                });
            }
        };

        try {
            vm.runInNewContext(script, sandbox, {
                timeout: 10,
                displayErrors: true
            });
        } catch (error) {
            console.error(error);
        }
    }

    onLoadGitPath(gitDirPath) {
        getAllHistoryAsync(gitDirPath).then(([repository, commits])=> {
            console.log(repository, commits);
            this.setState({
                repository: repository,
                commits: commits,
                filteredCommits: commits
            });
        }).catch(console.error.bind(console));
    }
}
