const compression = require("compression");
const express = require("express");
const helmet = require("helmet");
const serveStatic = require("serve-static");
const morgan = require("morgan");
const path = require("path");


const app = express();
app.use(
  morgan(
    `:remote-addr - :remote-user [:date[web]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"`
  )
);
app.use(helmet());
app.use(compression({level: 9}));

app.get('/info', (req, res) => {
    return res.send("<h1>Hello world!</h1>")
});

app.use(
  serveStatic(path.join(`${__dirname}/public`), {
    maxAge: "15d"
  })
);

const _port = process.env.PORT || 8080;
app.listen(_port, () => console.info(`Server is running on ${_port} started on ${Date.now()}`));