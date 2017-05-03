/**
 * Created by bhuwan on 3/30/17.
 */

'use strict;'

var gas = require('../../config/db')


module.exports = {
    saveit : saveit,
};


//POST /movie operationId
function saveit(req, res, next) {
    var newGas = new gas(req.body);
    newGas.save(function (err,response) {
        if (err)
            res.send ({err:'err'});
        else
            res.send({success: "price is successfully submitted"})
    });

}

