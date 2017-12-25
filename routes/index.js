var express = require('express');
var path = require('path');
var child_process = require('child_process');
var router = express.Router();
var config = require("../config.json")

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Deploy Node.js Project'
    });
});

router.all('/webhook', function (req, res, next) {
    let rsp = {
        status: 0,
        msg: ""
    }
    let events = config.events;
    let branch = "master";
    let repo = "Deploy project success!";
    let script = path.resolve('./script/deploy-node');
    let token = config.token; 

    console.log(req.body);
    
    if (token && 
        req.body.token && 
        req.body.token != token) {
        rsp.status = 1;
        rsp.msg = "Token is wrong."
        return res.json(rsp);
    }

    if (events.indexOf(req.body.event) < 0) {
        rsp.status = 1;
        rsp.msg = "Unsupported."
        return res.json(rsp);
    }

    repo = req.body.repository.name;
    target_branch = req.body.merge_request.target_branch;
    if (target_branch != branch) {
        rsp.status = 1;
        rsp.msg = "Not target branch."
        return res.json(rsp);
    }

    child_process.exec(`${script} ${repo} ${branch}`, function(error, stdout, stderr){
        if(error) {
            console.error('error: ' + error);
            rsp.status = 1;
            rsp.msg = error;
        } else {
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + typeof stderr);
        }
        return res.json(rsp);
    });
});

module.exports = router;