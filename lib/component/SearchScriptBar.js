// LICENSE : MIT
"use strict";
import React from "react"
export default class SearchScriptBar extends React.Component {
    onClick(event) {
        var dom = React.findDOMNode(this);
        var userInput = dom.querySelector("#js-SearchScriptBar").value;
        this.props.handleInputChange(userInput);
    }

    render() {
        var defaultScript = `
var results = commits.filter(function(commit){
    return /text/.test(commit.message())
});
done(results);
`.trim();
        return <div className="SearchScriptBar">
            <textarea id="js-SearchScriptBar" defaultValue={defaultScript}/>
            <button onClick={this.onClick.bind(this)}>Run</button>
        </div>
    }
}
