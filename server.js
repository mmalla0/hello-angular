// set up ======================== 
var express = require('express');
var app = express();                               // create our app w/ express 
var path = require('path');
var mysql = require('mysql');

bodyParser = require('body-parser');


// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

// configuration =================
app.use(express.static(path.join(__dirname, '/dist/angular')));  //TODO rename to your app-name

// listen (start app with node server.js) ======================================
app.listen(8080, function () {
    console.log("App listening on port 8080");
});

// application -------------------------------------------------------------
app.get('/', function (req, res) {
    //res.send("Hello World123");     
    res.sendFile('index.html', { root: __dirname + '/dist/angular' });    //TODO rename to your app-name
});

app.get('/landing', function (req, res) {
    res.sendFile('index.html', { root: __dirname + '/dist/angular' }); //TODO rename to your app-name
});

function getItemsFromDatabase(req, res) {
    const connection = mysql.createConnection({
        database: "SpaceShop",
        host: "195.37.176.178",
        port: "20133",
        user: "23_IT_Grp_5",
        password: "JJQGNC8h79VkiSNmK}8I"
    });

    connection.connect(function (err) {
        if (err) {
            console.error('Error connecting to the database: ' + err.stack);
            return;
        }

        console.log('Connected to the database');

        connection.query('SELECT * FROM item', function (error, results, fields) {
            if (error) {
                console.error('Error executing the database query: ' + error.stack);
                return;
            }

            console.log('Retrieved items from the database');
            res.send(results);

            connection.end(function (err) {
                if (err) {
                    console.error('Error disconnecting from the database: ' + err.stack);
                    return;
                }

                console.log('Disconnected from the database');
            });
        });
    });

}