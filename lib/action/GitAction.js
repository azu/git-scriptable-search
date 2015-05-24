// LICENSE : MIT
"use strict";
import {Action} from "material-flux";
export var keys = {
    loadGitPath: Symbol("load git directory path")
};
export default class GitAction extends Action {
    loadGitPath(gitDirPath) {
        this.dispatch(keys.loadGitPath, gitDirPath);
    }
}
