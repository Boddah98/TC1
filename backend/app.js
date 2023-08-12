//Creation of the server
const express = require('express');
const app = express();

//Port define
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});