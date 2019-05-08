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
        type: {type: String, default: 'goldfish'},
        size: String,
        color:{type: String, default: 'golden'},
        mass: {type: Number, default: 0.007},
        name: {type: String, default: 'Angela'}
    });

    AnimalSchema.statics.findSize = function(size, callback){
        //this == Animal
        return this.find({size: size}, callback)
    }

    AnimalSchema.methods.findSameColor = function(callback) {
        return this.model('Animal').find({color: this.color}, callback)
    }

    let Animal= mongoose.model('Animal', AnimalSchema);

    let elephant = new Animal({
        type: 'elephant',
        color: 'gray',
        mass: 6000,
        name: 'Lawy'
    });

    AnimalSchema.pre('save', function(next){
        if(this.mass >= 100){
            this.size = 'big';
        } else{
            this.size = 'small';
        }
        next();
         
    })

    let animal = new Animal({})//Goldfish

    let whale = new Animal({
        type: 'whale',
        mass: 5000,
        name: 'Flippa'
    });

    let animalData = [ 
        {
            type: 'mouse',
            color: 'gray',
            mass: 0.0035,
            name: 'Marvin'
        },
        {
            type: 'nutria',
            color: 'brown',
            mass: 0.32,
            name: 'Richard'
        },
        {
            type: 'wolf',
            color: 'brown',
            mass: 0.34,
            name: 'Youngy'
        },
        elephant,
        animal,
        whale
    ];

    Animal.remove({}, function(err) {
        if (err) console.error(err);
        Animal.create(animalData, function(err, animals){
            if (err) console.error(err);
            Animal.findOne({type:'elephant'},function(err,elephant){
                elephant.findSameColor(function(err,animals){
                    animals.forEach(function(animal){
                        console.log(animal.name + ' the ' + animal.color+ ' ' + animal.type + ' is a ' + animal.size + '-sized animal.' )
                    });
                    db.close(function(){
                            console.log('db connection closed!');
                    }); 
                })
            });
        });

    });
});


