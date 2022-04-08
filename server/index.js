'use strict';

require('dotenv').config();

const app = require('./src/_app/app.module');
const port = process.env.NODE_PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));