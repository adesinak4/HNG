const express = require('express');
const app = express();
const port = process.env.PORT || 5050;

const Routes = require('./routes/routes');
app.use('/api', Routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
