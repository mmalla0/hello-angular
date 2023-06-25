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


const connection = mysql.createConnection({
    database: "SpaceShop",
    host: "195.37.176.178",
    port: "20133",
    user: "23_IT_Grp_5",
    password: "JJQGNC8h79VkiSNmK}8I"
});

//app.get('/landing', function (req, res) {
//    res.sendFile('index.html', { root: __dirname + '/dist/angular' });
//});


app.get('/items/', function (req, res) {
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
                return;
            }

            console.log('Retrieved items from the database');

            // Transform the database results into item objects
            const items = results.map(itemResult => {
                const item = {
                    item_ID: itemResult.item_ID,
                    item_name: itemResult.item_name,
                    item_description: itemResult.item_description,
                    item_price: itemResult.item_price,
                    stock: itemResult.stock,
                    employee_id: itemResult.employee_id,
                    best_before: itemResult.best_before,
                    images: []
                };

                return item;
            });

            // Fetch images for each item
            const itemPromises = items.map(item => {
                return new Promise((resolve, reject) => {
                    connection.query('SELECT * FROM images WHERE imgitemID = ?', [item.item_ID], function (err, imageResults) {
                        if (err) {
                            console.error('Error executing the image database query:', err.stack);
                            reject(err);
                            return;
                        }

                        // Transform the image results into image objects
                        const images = imageResults.map(imageResult => {
                            const image = {
                                imgitemID: imageResult.imgitemID,
                                img_url: imageResult.img_url,
                                imgAlt: imageResult.imgAlt
                            };

                            return image;
                        });

                        item.images = images;
                        resolve();
                    });
                });
            });

            // Wait for all image promises to resolve before sending the response
            Promise.all(itemPromises)
                .then(() => {
                    res.json(items);
                })
                .catch(error => {
                    console.error('Error fetching item images:', error);
                    res.status(500).json({ error: 'Failed to fetch item images' });
                });
        });

        connection.end(function (err) {
            if (err) {
                console.error('Error disconnecting from the database:', err.stack);
                return;
            }

            console.log('Disconnected from the database');
        });
    });
});


