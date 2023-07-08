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
app.use(express.static(path.join(__dirname, '/dist/angular')));  //TODO: rename to your app-name
app.use(express.static(path.join(__dirname, 'src')));

app.use(express.json());

// listen (start app with node server.js) ======================================
app.listen(8080, function () {
    console.log("App listening on port 8080");
});

// application -------------------------------------------------------------
app.get('/', function (req, res) {
    //res.send("Hello World123");
    res.sendFile('index.html', { root: __dirname + '/dist/angular' });    //TODO: rename to your app-name
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

    var connection = mysql.createConnection({
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
    const { username, password } = req.body;

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

        const query = 'SELECT * FROM customer WHERE username = ? AND password = ?';
        connection.query(query, [username, password], (error, results) => {
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
    const {  first_name, last_name, password, username, email, paymentMethod } = req.body;


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
        // Führe die MySQL-Abfrage aus, um den Customer in die Datenbank einzufügen
        const query = 'INSERT INTO customer (first_name, last_name, password , username , email, paymentMethod ) VALUES (?, ?, ?, ?,?,?)';
        connection.query(query, [ first_name, last_name,password,username, email, paymentMethod], (error, results) => {
            if (error) {
                console.error('Fehler bei der Ausführung der MySQL-Abfrage:', error);
                res.status(500).json({ message: 'Interner Serverfehler' });
            } else {
                res.status(200).json({ message: 'Registrierung erfolgreich' });
            }
        });

    });


});


// Define the API endpoint for adding an item
app.post('/additem', (req, res) => {
    var connection = mysql.createConnection({
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

        const newItem = req.body;

        console.log('Categories reaching the server side: ' + newItem.categories);

        // Insert the new item into the item table
        const query = `INSERT INTO item (item_name, item_description, item_price, stock, employee_id, best_before, item_imgpath) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        const itemValues = [
            newItem.item_name,
            newItem.item_description,
            newItem.item_price,
            newItem.stock,
            newItem.employee_id,
            newItem.best_before,
            newItem.item_imgpath
        ];

        connection.query(query, itemValues, (error, itemResult) => {
            if (error) {
                console.error('Error adding item:', error);
                res.status(500).json({ error: 'Failed to add item' });
            } else {
                console.log('Item added successfully');
                const itemId = itemResult.insertId;
                console.log(itemId);

                // Fetch category IDs based on category names
                const categoryNames = newItem.categories;
                console.log(categoryNames);
                if (categoryNames.length > 0) {
                    const placeholders = categoryNames.map(() => '?').join(', ');
                    const getCategoryIdsQuery = `SELECT category_id FROM category WHERE category_name IN (${placeholders})`;

                    connection.query(getCategoryIdsQuery, categoryNames, (error, categoryResults) => {
                        if (error) {
                            console.error('Error fetching category IDs:', error);
                            res.status(500).json({ error: 'Failed to fetch category IDs' });
                        } else {
                            console.log('Category IDs fetched successfully');
                            const categoryIds = categoryResults.map((row) => row.category_id);

                            // Insert category IDs and item ID into category_items table
                            const insertCategoryItemsQuery = 'INSERT INTO category_items (ci_category_id, ci_item_id) VALUES ?';
                            const categoryItemValues = categoryIds.map((categoryId) => [categoryId, itemId]);
                            console.log(categoryItemValues);

                            connection.query(insertCategoryItemsQuery, [categoryItemValues], (error) => {
                                if (error) {
                                    console.error('Error inserting into category_items:', error);
                                    res.status(500).json({ error: 'Failed to insert into category_items' });
                                } else {
                                    console.log('Category items inserted successfully');
                                    res.status(200).json({ message: 'Item added successfully' });
                                }
                            });
                        }
                    });
                } else {
                    console.log('No category names provided');
                    res.status(200).json({ message: 'Item added successfully' });
                }
            }
        });
    });
});




app.delete('/deleteitem/:itemId', (req, res) => {
    const itemId = req.params.itemId;

    const connection = mysql.createConnection({
        database: "23_IT_Gruppe5",
        host: "195.37.176.178",
        port: "20133",
        user: "23_IT_Grp_5",
        password: "JJQGNC8h79VkiSNmK}8I"
    });

    connection.connect((err) => {
        if (err) {
            console.error('Error connecting to the database:', err.stack);
            res.status(500).json({ error: 'Failed to connect to the database' });
            return;
        }

        console.log('Connected to the database');

        // Delete the item from the item table
        const query = 'DELETE FROM item WHERE item_ID = ?';
        const values = [itemId];

        connection.query(query, values, (error, result) => {
            if (error) {
                console.error('Error deleting item:', error);
                res.status(500).json({ error: 'Failed to delete item' });
            } else {
                console.log('Item deleted successfully');
                res.status(200).json({ message: 'Item deleted successfully' });
            }
        });

        connection.end(); // Close the database connection
    });
});


// GET endpoint to retrieve all categories
app.get('/getAllCategories', (req, res) => {

    const connection = mysql.createConnection({
        database: "23_IT_Gruppe5",
        host: "195.37.176.178",
        port: "20133",
        user: "23_IT_Grp_5",
        password: "JJQGNC8h79VkiSNmK}8I"
    });

    connection.connect((err) => {
        if (err) {
            console.error('Error connecting to the database:', err.stack);
            res.status(500).json({ error: 'Failed to connect to the database' });
            return;
        }

        console.log('Connected to the database');

    const query = 'SELECT * FROM category';

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error retrieving categories:', err);
            res.status(500).json({ error: 'Failed to retrieve categories' });
        } else {
            res.json(results);
        }
    });
});

});

// GET endpoint to retrieve all category names
app.get('/getAllCategoryNames', (req, res) => {

    const connection = mysql.createConnection({
        database: "23_IT_Gruppe5",
        host: "195.37.176.178",
        port: "20133",
        user: "23_IT_Grp_5",
        password: "JJQGNC8h79VkiSNmK}8I"
    });

    connection.connect((err) => {
        if (err) {
            console.error('Error connecting to the database:', err.stack);
            res.status(500).json({ error: 'Failed to connect to the database' });
            return;
        }

        console.log('Connected to the database');

    const query = 'SELECT category_name FROM category';

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error retrieving category names:', err);
            res.status(500).json({ error: 'Failed to retrieve category names' });
        } else {
            const categoryNames = results.map((category) => category.category_name);
            res.json(categoryNames);
        }
    });
});

});



// POST endpoint to add a category
app.post('/addCategory', (req, res) => {

    const connection = mysql.createConnection({
        database: "23_IT_Gruppe5",
        host: "195.37.176.178",
        port: "20133",
        user: "23_IT_Grp_5",
        password: "JJQGNC8h79VkiSNmK}8I"
    });

    connection.connect((err) => {
        if (err) {
            console.error('Error connecting to the database:', err.stack);
            res.status(500).json({ error: 'Failed to connect to the database' });
            return;
        }

        console.log('Connected to the database');

        const { category, description } = req.body;

        const query = 'INSERT INTO category (category_name, category_description) VALUES (?, ?)';
        const values = [category, description];

        connection.query(query, values, (err) => {
            if (err) {
                console.error('Error adding category:', err);
                res.status(500).json({ error: 'Failed to add category' });
            } else {
                console.log('Category added successfully');
                res.sendStatus(200);
            }
        });
    });
});


// DELETE endpoint to delete a category
app.delete('/deleteCategory/:categoryId', (req, res) => {

    const connection = mysql.createConnection({
        database: "23_IT_Gruppe5",
        host: "195.37.176.178",
        port: "20133",
        user: "23_IT_Grp_5",
        password: "JJQGNC8h79VkiSNmK}8I"
    });

    connection.connect((err) => {
        if (err) {
            console.error('Error connecting to the database:', err.stack);
            res.status(500).json({ error: 'Failed to connect to the database' });
            return;
        }

        console.log('Connected to the database');

    const categoryId = req.params.categoryId;

    const query = 'DELETE FROM category WHERE category_id = ?';

    connection.query(query, categoryId, (err, result) => {
        if (err) {
            console.error('Error deleting category:', err);
            res.status(500).json({ error: 'Failed to delete category' });
        } else if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Category not found' });
        } else {
            console.log('Category deleted successfully');
            res.sendStatus(200);
        }
    });
});

});