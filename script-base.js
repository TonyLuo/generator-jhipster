'use strict';
var path = require('path'),
    util = require('util'),
    yeoman = require('yeoman-generator'),
    jhipsterUtils = require('./util.js');

module.exports = Generator;

function Generator() {
    yeoman.generators.NamedBase.apply(this, arguments);
    this.env.options.appPath = this.config.get('appPath') || 'src/main/webapp';
}

util.inherits(Generator, yeoman.generators.NamedBase);

Generator.prototype.addScriptToIndex = function (script) {
    try {
        var appPath = this.env.options.appPath;
        console.log("appPath: " + this.env.options.appPath);
        var fullPath = path.join(appPath, 'index.html');
        jhipsterUtils.rewriteFile({
            file: fullPath,
            needle: '<!-- endbuild -->',
            splicable: [
                    '<script src="scripts/' + script + '"></script>'
            ]
        });
    } catch (e) {
        console.log('\nUnable to find '.yellow + fullPath + '. Reference to '.yellow + script + '.js ' + 'not added.\n'.yellow);
    }
};

// This generates a date to be used by Liquibase changelogs
Generator.prototype.dateFormatForLiquibase = function (script) {
    var now = new Date();
    var year = "" + now.getFullYear();
    var month = "" + (now.getMonth() + 1); if (month.length == 1) { month = "0" + month; }
    var day = "" + now.getDate(); if (day.length == 1) { day = "0" + day; }
    var hour = "" + now.getHours(); if (hour.length == 1) { hour = "0" + hour; }
    var minute = "" + now.getMinutes(); if (minute.length == 1) { minute = "0" + minute; }
    var second = "" + now.getSeconds(); if (second.length == 1) { second = "0" + second; }
    return year + "" + month + "" + day + "" + hour + "" + minute + "" + second;
}
