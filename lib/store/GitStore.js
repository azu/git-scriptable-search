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
        var sandbox = {
            console: console,
            commits: this.state.commits,
            done: (filteredCommits) => {
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
        }catch(error){
            console.error(error);
        }
    }

    onLoadGitPath(gitDirPath) {
        getAllHistoryAsync(gitDirPath).then((commits)=> {
            this.setState({
                commits: commits,
                filteredCommits: commits
            });
        }).catch(console.error.bind(console));
    }
}
