// LICENSE : MIT
"use strict";
import React from "react"
import BaseComponent from "./BaseComponent"
import Infinite from "react-infinite"
export class GitLogItem extends BaseComponent {
    render() {
        var commit = this.props.commit;
        return <div className="GitLogItem">
            <pre>
            {commit.message()}
            </pre>
            <span className="sha-id">{commit.sha()}</span>
        </div>;
    }
}
export class GitLogList extends React.Component {
    static get propTypes() {
        return {
            commits: React.PropTypes.array
        }
    }

    render() {
        var items = this.props.commits.map(function (commit) {
            return <GitLogItem key={commit.sha()} commit={commit}/>;
        });
        return <div className="GitLogList">
            <Infinite containerHeight={800} elementHeight={100}>
                {items}
            </Infinite>
        </div>;
    }
}
