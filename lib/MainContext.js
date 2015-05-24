// LICENSE : MIT
"use strict";
import {Context} from "material-flux"
import GitAction from "./action/GitAction.js"
import GitStore from "./store/GitStore.js"
export default class MainContext extends Context {
    constructor() {
        super();
        this.gitAction = new GitAction(this);
        this.gitStore = new GitStore(this);
    }
}
