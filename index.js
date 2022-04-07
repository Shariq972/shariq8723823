const config = require('config');
const mongoose = require('mongoose');
const express = require('express');
const users = require('./routes/users');
const auth = require('./routes/auth');
const courses = require('./routes/courses');
const discussions = require('./routes/discussions');
const app = express();

if (!config.get("jwtPrivateKey")) {
    console.error("FATAL Error: JWT Private is not defined." );
    process.exit(1);
}

mongoose.connect(config.connectionstring)
.then(()=> {console.log("Connected")})
.catch(()=>{console.error("Error")});

app.use(express.json());
app.use(function(req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept");
        res.setHeader('Access-Control-Allow-Methods',"PUT, GET, POST, DELETE, OPTIONS");
        res.header("Access-Control-Allow-Origin", "*"); // keep this if your api accepts cross-origin requests topics
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-Access-Token, auth-token");
        next();
    }
)
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/courses', courses);
app.use('/api/discussions', discussions);

const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`Listening on port ${port}`));
