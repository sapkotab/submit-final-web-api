/**
 * Created by Bhuwan on 3/30/17.
 */
'use strict;'
var mongoose = require('mongoose');

var vault = require('avault').createVault(__dirname);
vault.get('GitVault', function (profileString) {
    if(!profileString){
        console.log('Error: required vault is not found');
    }else {
        var profile = JSON.parse(profileString);
        console.log(profile);
    }
    var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
    replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };

    var dbHost = 'mongodb://' + profile.username +':' + profile.password + '@ds161210.mlab.com:61210/gasprice';

        mongoose.connect(dbHost, options);
    });

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'))

db.once('open', function () {
    console.log("Connected to DB");
});

var gasSchema = new mongoose.Schema({
    storeNumber: {type: Number,required:true},
    storeName: {type: String, required: true},
    location: {type: String, required: true},
    regular: {type: Number, required: true},
    mid: {type: Number, required: true},
    premium: {type: Number, required: true},
    diesel: {type: Number, default: 0, required:true},
    date: { type: Date, default: new Date(), required:false },
    special:{type: String, required: true},
    store:{type: String, required: true},
})
module.exports = mongoose.model('gas', gasSchema)
