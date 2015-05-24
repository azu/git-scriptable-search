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
            var history = firstCommitOnMaster.history(nodegit.Revwalk.SORT.Time);
            history.on("commit", function (commit) {
                commits.push(commit);
            });
            history.on("end", function () {
                defer.resolve(commits);
            });
            history.start();
            return defer.promise;
        });
}
