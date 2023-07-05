// set up ========================
var express = require('express');
var app = express();                               // create our app w/ express
var path = require('path');
var mysql = require('mysql');
const multer = require('multer');
bodyParser = require('body-parser');
const cors = require('cors');

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

// configuration =================
app.use(express.static(path.join(__dirname, '/dist/angular')));  //TODO rename to your app-name
app.use(express.static(path.join(__dirname, 'src')));

app.use(express.json());

// listen (start app with node server.js) ======================================
app.listen(8080, function () {
    console.log("App listening on port 8080");
});

// application -------------------------------------------------------------
app.get('/', function (req, res) {
    //res.send("Hello World123");
    res.sendFile('index.html', { root: __dirname + '/dist/angular' });    //TODO rename to your app-name
});



/**
 * Logic for file uploads
 */

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/assets/images/'); // Destination folder for storing uploaded images
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Use the original filename for the uploaded image
    }
});

const upload = multer({ storage: storage });

app.post('/api/fileupload', upload.single('file'), function (req, res) {
    console.log('Received file:', req.file);

    if (!req.file) {
        console.log('No file uploaded');
        res.status(400).json({ error: 'No file uploaded' });
        return;
    }

    const uploadedFileName = req.file.originalname;
    res.json({ fileName: uploadedFileName });
    console.log('File uploaded:', req.file);
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

        connection.query('SELECT item.*, GROUP_CONCAT(category.category_name) AS categories ' +
            'FROM item ' +
            'JOIN category_items ON item.item_ID = category_items.ci_item_id ' +
            'JOIN category ON category_items.ci_category_id = category.category_id ' +
            'GROUP BY item.item_ID', function (error, results, fields) {
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
                        item_imgpath: itemResult.item_imgpath,
                        categories: itemResult.categories.split(',') // Split the category names into an array
                    };

                    return item;
                });

                res.json(items);

                connection.end(); // Close the connection here after retrieving the items
                console.log('Disconnected from the database');
        });
    });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;

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

        const query = 'SELECT * FROM customer WHERE email = ? AND password = ?';
        connection.query(query, [email, password], (error, results) => {
            if (error) {
                console.error('Fehler bei der Ausführung der MySQL-Abfrage:', error);
                res.status(500).json({ message: 'Interner Serverfehler' });
            } else {
                if (results.length > 0) {
                    // Erfolgreiche Authentifizierung
                    res.status(200).json({ message: 'Login erfolgreich' });
                } else {
                    // Fehlgeschlagene Authentifizierung
                    res.status(401).json({ message: 'Falsche E-Mail oder Passwort' });
                }
            }
        });
    });
})
 
app.post('/register', (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    // Führe die MySQL-Abfrage aus, um den Customer in die Datenbank einzufügen
    const query = 'INSERT INTO customer (first_name, last_name, email, password) VALUES (?, ?, ?, ?)';
    connection.query(query, [firstName, lastName, email, password], (error, results) => {
        if (error) {
            console.error('Fehler bei der Ausführung der MySQL-Abfrage:', error);
            res.status(500).json({ message: 'Interner Serverfehler' });
        } else {
            res.status(200).json({ message: 'Registrierung erfolgreich' });
        }
    });
});
