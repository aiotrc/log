const express = require('express');
const logController = require('./../../controller/log');
const logger = require('./../../log/log');

let router = express.Router();


router.post('/thingCassandra', (req, res) => {
    let top = req.query['top'] || 1;
    logController.getLogsFromCassandra(top).
    then((result)=>res.json(result)).
    catch((error)=>{
        logger.log('error', error);
        res.status(500).json(error);
    });

});

router.post('/thingInflux', (req, res) => {
    let top = req.query['top'] || 1;
	logController.getLogsFromInflux(top).
		then((result)=> {
			res.status(200).json(result);
		}).
		catch((error)=> {
			res.status(500).json(error);
		});
});
module.exports = router;
