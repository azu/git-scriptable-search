// LICENSE : MIT
"use strict";
import {Store} from "material-flux"
import {keys} from "../action/GitAction"
import {getAllHistoryAsync} from "../git/history"
export default class GitStore extends Store {
    constructor(...args) {
        super(...args);
        this.state = {
            commits: []
        };
        this.register(keys.loadGitPath, this.onLoadGitPath.bind(this));
    }

    getCommits() {
        return this.state.commits;
    }

    onLoadGitPath(gitDirPath) {
        getAllHistoryAsync(gitDirPath).then((commits)=> {
            this.setState({
                commits: commits
            });
        }).catch(console.error.bind(console));
    }
}
