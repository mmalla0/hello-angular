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




//app.get('/landing', function (req, res) {
//    res.sendFile('index.html', { root: __dirname + '/dist/angular' });
//});

app.get('/landing', function (req, res) {

    const connection = mysql.createConnection({
        database: "23_IT_Gruppe5",
        host: "195.37.176.178",
        port: "20133",
        user: "23_IT_Grp_5",
        password: "JJQGNC8h79VkiSNmK}8I"
    });

    connection.connect(function (err) {
        if (err) {
            console.error('Error connecting to the database:', err.stack);
            res.status(500).json({ error: 'Failed to connect to the database' });
            return;
        }

        console.log('Connected to the database');

        connection.query('SELECT * FROM item', function (error, results, fields) {
            if (error) {
                console.error('Error executing the database query:', error.stack);
                res.status(500).json({ error: 'Failed to retrieve items' });
                connection.end(); // Close the connection here in case of an error
                return;
            }

            console.log('Retrieved items from the database');

            const items = results.map(itemResult => {
                const item = {
                    item_ID: itemResult.item_ID,
                    item_name: itemResult.item_name,
                    item_description: itemResult.item_description,
                    item_price: itemResult.item_price,
                    stock: itemResult.stock,
                    employee_id: itemResult.employee_id,
                    best_before: itemResult.best_before,
                    item_imgpath: itemResult.item_imgpath
                };

                return item;
            });

            res.json(items);
            

            connection.end(); // Close the connection here after retrieving the items
            console.log('Disconnected from the database');
        });
    });
});

