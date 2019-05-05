'use strict';

const express = require('express');
const router = express.Router();

//GET /questions
//Route for getting question collections
router.get('/', function(req,res){
    res.json({
        message: 'you sent me a get request'
    })
});

module.exports = router;

//GET /questions/:qID
//Route for getting questions by ID
router.get('/:qID', function(req,res){
    res.json({
        message: 'you sent me a get request for ID '+ req.params.qID
    });
});

//POST /questions
//Route for posting questions
router.post('/', function(req,res){
    res.json({
        message: 'you sent me a post request',
        body:req.body
    });
});

//POST /questions/:qID/answers
//Route for creating answers
router.post('/:qID/answers',function(req,res){
    res.json({
        message: 'you sent me a POST request to /answers',
        questionID: req.params.id,
        body:req.body
    });
});

//PUT /questions/:qID/answers/:aID
//Route for updating a specified answer
router.put('/:qID/answers/:aID',function(req,res){
    res.json({
        message: 'you sent me a PUT request to edit this answer',
        questionID: req.params.qID,
        answerID: req.params.aID,
        body:req.body
    });
});

//DELETE /questions/:qID/answers/:aID
//Route for delete a specified answer
router.delete('/:qID/answers/:aID',function(req,res){
    res.json({
        message: 'you sent me a DELETE request to edit this answer',
        questionID: req.params.qID,
        answerID: req.params.aID
    });
});

//POST /questions/:qID/answers/:aID/vote-up
//POST /questions/:qID/answers/:aID/vote-down
//Route to vote on a specified answer
router.post('/:qID/answers/:aID/vote-:dir',function(req,res,next){
    if(req.params.dir.search(/^(up|down)$/)=== -1){
        let err = new Error("Not Found");
        err.status = 404;
        next(err);
        } else {
         next();
        }
    }, function(req,res){
    res.json({
        message: 'you sent me a POST request to /vote-' + req.params.dir,
        questionID: req.params.qID,
        answerID: req.params.aID,
        vote: req.params.dir
    });
});




module.exports = router;











