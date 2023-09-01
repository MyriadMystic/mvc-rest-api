const allowedOrigins = require('./allowedOrigins');

// Cross Origin Resource Sharing
const corsOptions = {
    origin: (origin, callback) => {
        // Allow only if on whitelist or (dev mode) if origin is undefined
        if (allowedOrigins.indexOf(origin) !== -1 || !origin ){
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionSuccessStatus: 200
}

module.exports = corsOptions;