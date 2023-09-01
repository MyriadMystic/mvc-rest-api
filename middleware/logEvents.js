const {format} = require('date-fns');
const {v4: uuid} = require('uuid'); //same as import uuid v4 as uuid

const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path')

const logEvents = async (message, logName) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
    console.log(logItem);
    try{
        // if the directory DNE then create it otherwise appendFile throws an error that the directory DNE, it will create files not directories
        if(!fs.existsSync(path.join(__dirname, '..', 'logs'))){
            await fsPromises.mkdir(path.join(__dirname, '..', "logs"));
        }
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logName), logItem);
    } catch (err) {
        console.log(err);
    }
}

const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, `reqLog.txt`);
    console.log(`${req.method}\t${req.url}`);
    next();
}

module.exports = {logger, logEvents};