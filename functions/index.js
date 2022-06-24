const functions = require("firebase-functions");
const admin = require('firebase-admin');
admin.initializeApp();
const axios = require('axios');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

//1. handle get htttps fun req 
exports.helloWorld = functions.https.onRequest((request, response) => {
    functions.logger.info("Hello logs!", { structuredData: true });
    response.send("Hello from Firebase cloud functions!");
});


// handle all req Get, post,delete requests

exports.api2 = functions.https.onRequest(async (req, res) => {
    switch (req.method) {
        case "GET":
            const response=await axios.get("https://jsonplaceholder.typicode.com/users/1");
            res.send(response.data);
            
            // res.send('it was GET request..');
            break;
        case "POST":
            const body = req.body;
            res.send(body['name']);
            break;
        case "DELETE":
            
            res.send('it was DELETE request..');
            break;
        default:
           
            res.send('it was default request..');
            break;
    }
});


//when user authenticat firebase console or clint server --Authentication trigger

exports.userAdded=functions.auth.user().onCreate((user) => {
    console.log(`${user.email} is created` );
    return Promise.resolve();
});

exports.userDeleted=functions.auth.user().onDelete((user) => {
    console.log(`${user.email} is deleted` );
    return Promise.resolve();
});


//firestore collection function trigger event

exports.productAdded= functions.firestore.document('/Fruites/{documentId}').onCreate((snapshot,context) => {
    console.log(snapshot.data());
    return Promise.resolve();
});

exports.productDeleted= functions.firestore.document('/Fruites/{documentId}').onDelete((snapshot,context) => {
    console.log(snapshot.data(),'deleted');
    return Promise.resolve();
});

exports.productUpdated= functions.firestore.document('/Fruites/{documentId}').onUpdate((snapshot,context) => {
    console.log('before',snapshot.before.data());
    console.log('after',snapshot.after.data(),);
    return Promise.resolve();
});

//Schedule function event

exports.schedulefun= functions.pubsub.schedule('* * * * *').onRun(context=>{
    console.log("i am running every minute..");
    return null;
});