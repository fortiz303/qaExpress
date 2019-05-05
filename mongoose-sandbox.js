'use strict';

let mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/sandbox");

let db = mongoose.connection;

db.on('error', function(err){
    console.error('connection error:', err);
});

db.once('open', function(){
    console.log('db connection succesful');
    //All database communication goes here
    let Schema = mongoose.Schema;
    let AnimalSchema = new Schema({
        type: String,
        size: String,
        color: String,
        mass: Number,
        name: String
    });

    let Animal= mongoose.model('Animal', AnimalSchema);

    let elephant = new Animal({
        type: 'elephant',
        size: 'big',
        color: 'gray',
        mass: 6000,
        name: 'Lawy'
    });

    elephant.save(function(err){
        if(err) console.error('Save Failed', err);
        else console.log("Saved!");
        db.close(function(){
            console.log('db connection closed!');
        });
    });
});

