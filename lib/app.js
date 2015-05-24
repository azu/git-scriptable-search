// LICENSE : MIT
"use strict";
import React from "react"
import MainContext from "./MainContext.js"
import App from './Component/AppComponent.js';
var context = new MainContext();
context.gitAction.loadGitPath(__dirname + "/../.git");
React.render(
    React.createElement(App, {context}),
    document.body
);