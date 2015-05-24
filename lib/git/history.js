// LICENSE : MIT
"use strict";
var nodegit = require("nodegit");
import Promise from "bluebird"
// This code walks the history of the master branch and prints results
// that look very similar to calling `git log` from the command line
export function getAllHistoryAsync(gitDirPath) {
    return nodegit.Repository.open(gitDirPath)
        .then(function (repo) {
            return repo.getMasterCommit();
        })
        .then(function (firstCommitOnMaster) {
            var defer = Promise.defer();

            var commits = [];
            // History returns an event.
            var history = firstCommitOnMaster.history(nodegit.Revwalk.SORT.Time);
            // History emits "commit" event for each commit in the branch's history
            history.on("commit", function (commit) {
                commits.push(commit);
            });
            history.on("end", function () {
                defer.resolve(commits);
            });
            // Don't forget to call `start()`!
            history.start();
            return defer.promise;
        });
}
