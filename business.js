const express = require('express');
const router = express.Router();
const dbConfig = require('./db')  
var sql = require('mssql')  

router.get('/', (req, res) => {
    sql.connect(dbConfig).then(function () {
        var request = new sql.Request();
        request.query("SELECT * from CQ_BUSINESS").then(function (data) { 
            res.send(data.recordsets);
        }).catch(function (err) {
            res.status(500)  
            res.send(err.originalError)
        });
    }).catch(function (err) {
        res.status(500)  
        res.send(err.originalError) 
    });
});


//Save Business
router.post('/', (req, res) => {  
    try {  
        const query = `INSERT into CQ_BUSINESS (CATG_ID,LANG_ID,BIS_name,BIS_email, BIS_legal_rep_ID, BIS_legal_rep_Number,BIS_legal_rep_mobile_number,BIS_website,BIS_phone_number,BIS_is_registered,BIS_is_active) values
                        (1,1,'${req.body.name}', '${req.body.email}',0,0,0,'xyz.com','${req.body.phone}',1,1)` 
        sql.connect(dbConfig).then(function () {
            var request = new sql.Request();
            request.query(query).then(function (data) { 
                if(data.rowsAffected > 0) {
                    res.send(JSON.stringify({"status": 200, "error": null, "response": "Record Inserted"}));
                } else {
                    res.send(JSON.stringify({"status": 200, "error": "Unable to add record"}));
                }
            }).catch(function (err) {
                res.status(500)  
                res.send(err)
            });
        }).catch(function (err) {
            res.status(500)  
            res.send(err.originalError) 
        });
    } catch (err) {  
        res.status(400).json({ message: "invalid" })  
        res.send(err.message)  
    }

});

router.delete('/', (req, res) => {  
    try {  
        const query = `UPDATE CQ_BUSINESS SET BIS_is_active=0 WHERE BUSINESS_ID=${req.body.businessId}` 
        sql.connect(dbConfig).then(function () {
            var request = new sql.Request();
            request.query(query).then(function (data) { 
                if(data.rowsAffected > 0) {
                    res.send(JSON.stringify({"status": 200, "error": null, "response": "Record Deleted"}));
                } else {
                    res.send(JSON.stringify({"status": 200, "error": "Unable to Delete record"}));
                }
            }).catch(function (err) {
                res.status(500)  
                res.send(err.originalError)
            });
        }).catch(function (err) {
            res.status(500)  
            res.send(err.originalError) 
        });
    } catch (err) {  
        res.status(400).json({ message: "invalid" })  
        res.send(err.message)  
    }

});




module.exports = router;