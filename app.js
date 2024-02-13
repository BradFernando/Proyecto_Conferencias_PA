const express = require('express');
const app = express();
const port = 3000;

// Cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

// Import routes
const indexRouter = require('./routes');
const usersRouter = require('./routes/users');
const roleRouter = require('./routes/role');
const mailRouter = require('./routes/mail');
const participantesRouter = require('./routes/participantes');
const participantePagoRouter = require('./routes/participantePago');


// Use JSON
app.use(express.json({limit: '50mb'}));

// Use routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/role', roleRouter);
app.use('/mail', mailRouter);
app.use('/participantes', participantesRouter);
app.use('/participantePago', participantePagoRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});