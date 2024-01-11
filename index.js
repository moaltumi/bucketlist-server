const express = require('express'); //first
const fs = require ('fs'); //second
const cors = require ('cors'); // top 
const {v4: uuivd4} = require('uuid');
require('dotenv').config();
const app =  express();
app.use(express.json());
app.use(cors());




app.get('/', (req, res) => { //handler for root route
    res.send('set your bucketlists now');
});


app.get('/bucketlist', (req, res) => { // handler for bucketlist route for all the bucketlist items 
    const bucketlist = fs.readFileSync('./data/bucketlist.json', 'utf8');
    res.json(JSON.parse(bucketlist));
});




//optional if we want to get a single bucketlist item

app.get('/bucketlist/:id', (req, res) => { 
    const bucketlist = fs.readFileSync('./data/bucketlist.json', 'utf8');
    const bucketlistsArray = JSON.parse(bucketlist);
    const foundBucketlist = bucketlistsArray.find((bucketlist) => bucketlist.id === req.params.id);

    if (!foundBucketlist) {
        res.json({ message: 'your id is not found in the data base' });
    }
    res.json(foundBucketlist);
}
);




app.post('/bucketlist', (req, res) => {
    const bucketlist = fs.readFileSync('./data/bucketlist.json', 'utf8');
    bucketlist = JSON.parse(bucketlist);
    const newBucketlist = {
        id: uuivd4(),
        todo: req.body.todo,
        todowhy: req.body.todowhy,
        doneBy: req.body.doneBy,
        
     };

    bucketlist.push(newBucketlist);
    fs.writeFileSync('./data/bucketlist.json', JSON.stringify(bucketlistsArray));
    res.json(bucketlist);

});


app.listen(7070, () => {
    console.log('listening on port 7070'); //url to see the data in the browser localhost:7070
    
}); 

