/*
Created by : Contat Paul
For any information, please contact at : contat.paul@gmail.com

Class for utils function
*/

"use strict";
const fs = require('fs'),
    utils = {

        // function to encode file data to base64 encoded string
        base64_encode: function (file) {
            // read binary data
            var bitmap = fs.readFileSync(file);
            // convert binary data to base64 encoded string
            return new Buffer(bitmap).toString('base64');
        },

        //Give ramdon number
        randomIntInc: function (low, high) {
            return Math.floor(Math.random() * (high - low + 1) + low);
        },

        //Format date for dateBased search
        getTodayDateFormat: function () {
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1; //January is 0!
            var yyyy = today.getFullYear();
            if (dd < 10) {
                dd = '0' + dd;
            }
            if (mm < 10) {
                mm = '0' + mm;
            }
            //today = yyyy + '/' + mm + '/' + dd;
            today = dd + '/' + mm + '/' + yyyy;
            return today;
        },

        //Read the file name from folder and do callback for everyone of them
        readFolder: function (dirname, callback, onError) {
            fs.readdir(dirname, function (err, filenames) {
                if (err) {
                    onError(err);
                    return;
                }
                filenames.forEach(function (filename) {
                    callback(filename);
                });
            });
        },


        //Get extension from string
        getExt: function (path) {
            var i = path.lastIndexOf('.');
            return (i < 0) ? false : path.substr(i);
        },


        isFunction: function (functionToCheck) {
            var getType = {};
            return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
        },
    };
    
module.exports = utils;