const express = require('express');
const app = express();
const path = require('path');


// app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/:partner', (req, res) => {
    res.sendFile(path.join(__dirname, 'menu.html'));
});

app.get('/menu' , (req, res) => {
    res.sendFile(path.join(__dirname, 'menu.html'));
});

app.get('/test' , async (req, res) => {


    for (let i=1; i<=50; i++) {
        const response = await fetch('https://cravings-pdf-viewer.pages.dev/menu?partner=salkara');
        console.log(`Request ${i} status:`, response.status);
    }

    res.send('Test completed');
    

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
