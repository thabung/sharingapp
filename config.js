module.exports = {
    development: {
        "username": "root",
        "password": "root",
        "database": "sharingapp",
        "host": "localhost",
        "dialect": "mysql",
        "timezone": '+05:30',
        "jwtsecret": 'proclecollaboration',
        "token_expire_days": 2,
        "defaultPort": "3000",
        "emailFrom":"sharingapp@share.com",
        "resetpasswordUrl":"localhost:3000/reset-password"
    }
};


