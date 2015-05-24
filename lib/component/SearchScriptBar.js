// LICENSE : MIT
"use strict";
import React from "react"
import ReactCodeMirror from "react-code-mirror"
require("codemirror/mode/javascript/javascript.js");
require("codemirror/mode/meta.js");
require("codemirror/addon/edit/continuelist.js");


export default class SearchScriptBar extends React.Component {
    constructor(props) {
        super(props);
        //code mirror
        this.editor = null;
        this.extraKeys = {
            "Cmd-Enter": (cm)=> {
                var userInput = cm.getValue();
                this.props.handleInputChange(userInput);
                console.log(cm);
            }

        };

    }

    componentDidMount() {
        var nodes = React.findDOMNode(this);
        this.editor = nodes.querySelector(".CodeMirror").CodeMirror;
    }

    onClick(event) {
        var userInput = this.editor.getValue();
        this.props.handleInputChange(userInput);
    }

    render() {
        var defaultScript = `
// http://www.nodegit.org/api/commit/
var results = commits.filter(function(commit){
    return /test/.test(commit.message())
});
done(results);
`.trim();
        return <div className="SearchScriptBar">
            <ReactCodeMirror defaultValue={defaultScript}
                             mode="javascript"
                             lineNumbers="true"
                             extraKeys={this.extraKeys}
                />
            <button onClick={this.onClick.bind(this)}>Run</button>
        </div>
    }
}
