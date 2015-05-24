// LICENSE : MIT
"use strict";
export default function filter(commits, done) {
    var results = [];
    var promises = commits.map(function (commit) {
        return commit.getDiff().then(function (diffList) {
            diffList.forEach(function (diff) {
                diff.patches().forEach(function (patch) {
                    patch.hunks().forEach(function (hunk) {
                        hunk.lines().forEach(function (line) {
                            // + or -
                            var sign = String.fromCharCode(line.origin());
                            if (sign === "+") {

                            } else if (sign === "-") {
                                if (/forget/.test(line.content())) {
                                    results.push(commit);
                                    console.log(commit)
                                }
                            }
                        });
                    });
                });
            });
        })
    });
    Promise.all(promises).then(function () {
        done(results);
    });
}