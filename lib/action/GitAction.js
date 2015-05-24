// LICENSE : MIT
"use strict";
import {Action} from "material-flux";
export var keys = {
    loadGitPath: Symbol("load git directory path"),
    filterByString: Symbol("filter string to RegExp"),
    filterByScript: Symbol("filter scrip")
};
export default class GitAction extends Action {
    loadGitPath(gitDirPath) {
        this.dispatch(keys.loadGitPath, gitDirPath);
    }

    filterByString(string) {
        this.dispatch(keys.filterByString, string);
    }

    filterByScript(script) {
        this.dispatch(keys.filterByScript, script);
    }
}
