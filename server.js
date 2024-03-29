// set up ========================
var express = require('express');
var app = express();                               // create our app w/ express
var path = require('path');
var mysql = require('mysql');
const multer = require('multer');
bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const WebSocket = require('ws'); 
const nodemailer = require('nodemailer');

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
// Keep track of connected clients
const clients = new Set();

// Handle new websocket connections
wss.on('connection', (ws) => {
  console.log('WebSocket client connected');
  
  // Add the client to the set of connected clients
  clients.add(ws);
  
  // Handle client disconnection
  ws.on('close', () => {
    console.log('WebSocket client disconnected');
    
    // Remove the client from the set of connected clients
    clients.delete(ws);
  });
});

// configure e-mail transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'spacesaversshop@gmail.com', // Absender-E-Mail-Adresse
      pass: '4spacesavers!' // Passwort für die Absender-E-Mail-Adresse
    }
  });
  
// Route for sending the e-mail
app.post('/send-email', (req, res) => {
const { from, to, subject, text, attachment } = req.body;

// create e-mail
const mailOptions = {
    from: from,
    to: to,
    subject: subject,
    text: text,
};
console.log('Email will be send to', from);
    // check if attachment exists
if (attachment) {
    mailOptions.attachments = [
    {
        filename: attachment.filename,
        content: attachment.content
    }
    ];
}

// send e-mail
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
    console.error('Error while trying to send the e-mail:', error);
    res.status(500).send('Error while trying to send the e-mail');
    } else {
    console.log('Email has been sent!:', info.response);
    res.status(200).send('Email has been sent!');
    }
});
});
  

function handleItemChange() {
    console.log('Handle item change');
    // Broadcast a notification to all connected clients about the change
    const message = JSON.stringify({ event: 'itemListChange' });
  
    clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
} 
  
// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

// configuration =================
app.use(express.static(path.join(__dirname, '/dist/angular'))); 
app.use(express.static(path.join(__dirname, 'src')));

app.use(express.json());

//CORS-Header setzen, um Anfragen von beliebigen Ursprüngen zu akzeptieren
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

// listen (start app with node server.js) ======================================
server.listen(8080, function () {
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

                connection.end(); 
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
                    const user = results[0]; // Nehme das erste Benutzerobjekt aus den Ergebnissen
                    res.status(200).json(user); // Sende das Benutzerobjekt als JSON-Antwort
                } else {
                    // Fehlgeschlagene Authentifizierung
                    res.status(401).json({ message: 'Falsche E-Mail oder Passwort' });
                }
            }
        });
    });
})

app.post('/login-employee', (req, res) => {
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

        const query = 'SELECT * FROM employee WHERE email = ? AND password = ?';
        connection.query(query, [email, password], (error, results) => {
            if (error) {
                console.error('Fehler bei der Ausführung der MySQL-Abfrage:', error);
                res.status(500).json({ message: 'Interner Serverfehler' });
            } else {
                if (results.length > 0) {
                    // Erfolgreiche Authentifizierung
                    const user = results[0]; // Nehme das erste Benutzerobjekt aus den Ergebnissen
                    res.status(200).json(user); // Sende das Benutzerobjekt als JSON-Antwort
                  } else {
                    // Fehlgeschlagene Authentifizierung
                    res.status(401).json({ message: 'Falsche E-Mail oder Passwort' });
                }
            }
        });
    });
})

app.post('/register', (req, res) => {
    const { first_name, last_name, password, username, email, paymentMethod, address_id } = req.body;
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
        const query = 'INSERT INTO customer (first_name, last_name, password, username, email, paymentMethod, address_id) VALUES (?, ?, ?, ?, ?, ?, ?)';
        connection.query(query, [first_name, last_name, password, username, email, paymentMethod, address_id], (error, results) => {
            if (error) {
                console.error('Fehler bei der Ausführung der MySQL-Abfrage:', error);
                res.status(500).json({ message: 'Interner Serverfehler' });
            } else {
                const createdUser = {
                    id: results.insertId,
                    firstName: first_name,
                    lastName: last_name,
                    username: username,
                    email: email,
                    paymentMethod: paymentMethod,
                    addressId: address_id
                };
                res.status(200).json(createdUser);
            }
        });
    });
});

app.post('/add-address', (req, res) => {
    const { customer_id, street_name, street_number, city, zip_code, country, planet  } = req.body;
 
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
        const query = 'INSERT INTO address (customer_id, street_name, street_number, city, zip_code, country, planet ) VALUES (?, ?, ?, ?,?,?,?)';
        connection.query(query, [ customer_id, street_name, street_number, city, zip_code, country, planet ], (error, results) => {
            if (error) {
                console.error('Fehler bei der Ausführung der MySQL-Abfrage:', error);
                res.status(500).json({ message: 'Interner Serverfehler' });
            } else {
                const createdObject = {
                    id:  results.insertId, 
                  };
                res.status(200).json(createdObject);
            }
        });

    }); 
});

app.put('/customer/:id/address', (req, res) => {
    const customer_id = req.params.id; // ID des Kunden
    const { address_id } = req.body; // Neue Adresse-ID für den Kunden
  
    const connection = mysql.createConnection({
      database: "23_IT_Gruppe5",
      host: "195.37.176.178",
      port: "20133",
      user: "23_IT_Grp_5",
      password: "JJQGNC8h79VkiSNmK}8I"
    });
  
    connection.connect((err) => {
      if (err) {
        console.error('Fehler bei der Verbindung zur Datenbank:', err.stack);
        res.status(500).json({ error: 'Verbindung zur Datenbank fehlgeschlagen' });
        return;
      }
  
      console.log('Verbindung zur Datenbank hergestellt');
  
      const query = `UPDATE customer SET address_id = ? WHERE id = ?`;
      const values = [address_id, customer_id];
  
      connection.query(query, values, (error, results) => {
        if (error) {
          console.error('Fehler beim Aktualisieren der Adresse-ID:', error);
          res.status(500).json({ error: 'Fehler beim Aktualisieren der Adresse-ID' });
        } else {
          console.log('Adresse-ID des Kunden erfolgreich aktualisiert');
          res.status(200).json({ message: 'Adresse-ID des Kunden erfolgreich aktualisiert' });
        }
      });
    });
  });

app.get('/getAddress/:id', (req, res) => {
    console.log('Entered get address');
    const addressId = req.params.id;
  
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
  
      const query = 'SELECT * FROM address WHERE customer_id = ?';
      connection.query(query, [addressId], (error, results) => {
        if (error) {
          console.error('Error executing MySQL query:', error);
          res.status(500).json({ message: 'Internal server error' });
        } else {
          if (results.length === 0) {
            res.status(404).json({ message: 'Address not found' });
          } else {
            const address = {
              id: results[0].address_id,
              street: results[0].street_name,
              houseNumber: results[0].street_number,
              postalCode: results[0].zip_code,
              city: results[0].city,
              country: results[0].country,
              planet: results[0].planet
            };
            res.status(200).json(address);
          }
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
                    handleItemChange();
                } else {
                    console.log('No category names provided');
                    res.status(200).json({ message: 'Item added successfully' });
                    handleItemChange();
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
                handleItemChange();
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

// ENDPOINT for retrieving the stockpile items by customer id
app.get('/getStockpileByCustomerID/:customerID', (req, res) => {
    const customerID = req.params.customerID;

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

        const query = `
        SELECT DISTINCT
        s.stockpile_ID,
        i.item_name,
        s.quantity,
        i.best_before,
        i.item_description,
        c.category_name
    FROM stockpile s
    JOIN item i ON s.item_ID = i.item_ID
    JOIN category_items ci ON i.item_ID = ci.ci_item_id
    JOIN category c ON ci.ci_category_id = c.category_id
    WHERE s.customer_ID = ?`;

        const values = [customerID];

        connection.query(query, values, (err, results) => {
            if (err) {
                console.error('Error retrieving stockpile:', err);
                res.status(500).json({ error: 'Failed to retrieve stockpile' });
            } else {
                console.log("Stockpile items successfully retrieved!");

                const stockpileItems = [];
                results.forEach((result) => { 
                    const bestBeforeDate = result.best_before ? new Date(result.best_before) : '-';
                    const existingItem = stockpileItems.find((item) => item.id === result.stockpile_ID);
                    if (existingItem) {
                        existingItem.category += `, ${result.category_name.split(',')[0].trim()}`;
                    } else {
                        stockpileItems.push({
                            id: result.stockpile_ID,
                            name: result.item_name,
                            quantity: result.quantity,
                            bestBeforeDate: bestBeforeDate,
                            product: result.item_description,
                            category: result.category_name.split(',')[0].trim()
                        });
                    }
                });
                console.log(stockpileItems);
                res.json(stockpileItems);
            }
        });
    });
});

app.post('/updateUserStockpile/:stockpileId', (req, res) => {
    const customerId = req.params.stockpileId;
    const orderItems = req.body;
  
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
  
      let queryCount = 0; // Counter for completed queries
  
      // Check if entry exists for each order item
      orderItems.forEach((orderItem) => {
        const checkQuery = 'SELECT COUNT(*) AS count FROM stockpile WHERE customer_ID = ? AND item_ID = ?';
        const checkValues = [customerId, orderItem.itemId];
  
        connection.query(checkQuery, checkValues, (checkError, checkResult) => {
          if (checkError) {
            console.error('Error checking for existing entry:', checkError);
            res.status(500).json({ error: 'Failed to update userStockpile' });
            return;
          }
  
          const count = checkResult[0].count;
  
          if (count > 0) {
            // If entry exists, update the quantity
            const updateQuery = 'UPDATE stockpile SET quantity = quantity + ? WHERE customer_ID = ? AND item_ID = ?';
            const updateValues = [orderItem.quantity, customerId, orderItem.itemId];
  
            connection.query(updateQuery, updateValues, (updateError, updateResult) => {
              if (updateError) {
                console.error('Error updating userStockpile:', updateError);
                res.status(500).json({ error: 'Failed to update userStockpile' });
                return;
              }
  
              queryCount++;
  
              // Check if all queries have completed
              if (queryCount === orderItems.length) {
                console.log('Stockpile items were updated');
                res.json({ message: 'Stockpile items were updated' });
                connection.end();
              }
            });
          } else {
            // If entry doesn't exist, insert a new row
            const insertQuery = 'INSERT INTO stockpile (customer_ID, item_ID, quantity) VALUES (?, ?, ?)';
            const insertValues = [customerId, orderItem.itemId, orderItem.quantity];
  
            connection.query(insertQuery, insertValues, (insertError, insertResult) => {
              if (insertError) {
                console.error('Error inserting userStockpile:', insertError);
                res.status(500).json({ error: 'Failed to update userStockpile' });
                return;
              }
  
              queryCount++;
  
              // Check if all queries have completed
              if (queryCount === orderItems.length) {
                console.log('Stockpile items were updated');
                res.json({ message: 'Stockpile items were updated' });
                connection.end();
              }
            });
          }
        });
      });
    });
  });
  
  


app.post('/reduceStock', (req, res) => {
    const orderItems = req.body;

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
    
        // update items in Database with orderItems Array
        for (const orderItem of orderItems) {
            const query = 'UPDATE item SET stock = stock - ? WHERE item_ID = ?';
            const values = [orderItem.quantity, orderItem.itemId];
    
            connection.query(query, values, (error, result) => {
                if (error) {
                    console.error('Error updating stock:', error);
                    res.status(500).json({ error: 'Failed to update stock' });
                } else {
                    console.log('Successfully reduced stock');
                    handleItemChange();
                }
            });
        }
        connection.end(); 
    });
});
 


// DELETE endpoint to delete a stockpile item
app.delete('/deleteStockpileItem/:stockpileId', (req, res) => {
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

        const stockpileId = req.params.stockpileId;

        const queryDisableFKCheck = 'SET FOREIGN_KEY_CHECKS = 0';
        const queryEnableFKCheck = 'SET FOREIGN_KEY_CHECKS = 1';
        const queryUpdateStockpileQuantity = 'UPDATE stockpile SET quantity = quantity - 1 WHERE stockpile_ID = ?';
        const queryDeleteStockpileItem = 'DELETE FROM stockpile WHERE stockpile_ID = ? AND quantity = 0';

        connection.query(queryDisableFKCheck, (disableFKErr) => {
            if (disableFKErr) {
                console.error('Error disabling foreign key check:', disableFKErr);
                res.status(500).json({ error: 'Failed to disable foreign key check' });
                return;
            }

            connection.query(queryUpdateStockpileQuantity, stockpileId, (updateErr, updateResult) => {
                if (updateErr) {
                    console.error('Error updating stockpile quantity:', updateErr);
                    res.status(500).json({ error: 'Failed to update stockpile quantity' });
                } else if (updateResult.affectedRows === 0) {
                    res.status(404).json({ error: 'Stockpile item not found' });
                } else {
                    console.log('Stockpile quantity updated successfully');
                    connection.query(queryDeleteStockpileItem, stockpileId, (deleteErr, deleteResult) => {
                        if (deleteErr) {
                            console.error('Error deleting stockpile item:', deleteErr);
                            res.status(500).json({ error: 'Failed to delete stockpile item' });
                        } else if (deleteResult.affectedRows === 0) {
                            console.log('Stockpile quantity is not zero, no need to delete the item');
                            connection.query(queryEnableFKCheck, (enableFKErr) => {
                                if (enableFKErr) {
                                    console.error('Error enabling foreign key check:', enableFKErr);
                                    res.status(500).json({ error: 'Failed to enable foreign key check' });
                                } else {
                                    const result = { message: 'Stockpile quantity updated successfully' };
                                    res.status(200).json(result);
                                }
                            });
                        } else {
                            console.log('Stockpile item deleted successfully');
                            connection.query(queryEnableFKCheck, (enableFKErr) => {
                                if (enableFKErr) {
                                    console.error('Error enabling foreign key check:', enableFKErr);
                                    res.status(500).json({ error: 'Failed to enable foreign key check' });
                                } else {
                                    const result = { message: 'Stockpile item deleted successfully' };
                                    res.status(200).json(result);
                                }
                            });
                        }
                    });
                }
            });
        });
    });
});





app.get('/getitem/:itemId', (req, res) => {

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

    const itemId = req.params.itemId;

        const sql = `
    SELECT i.*, c.*
    FROM item AS i
    INNER JOIN category_items AS ci ON i.item_ID = ci.ci_item_id
    INNER JOIN category AS c ON ci.ci_category_id = c.category_id
    WHERE i.item_ID = ?`;

        connection.query(sql, [itemId], (error, results) => {
            if (error) {
                console.error('Error retrieving item:', error);
                res.status(500).json({ error: 'Error retrieving item' });
            } else if (results.length === 0) {
                res.status(404).json({ error: 'Item not found' });
            } else {
                const item = results[0];
                const categories = results.map((row) => row.category_name);
                item.categories = categories;
                res.status(200).json(item);
            }
        });
    });
});


// Endpoint for Editing Item
app.put('/editItem', (req, res) => {
    console.log(req.body);
    const item = req.body;

    const connection = mysql.createConnection({
        database: "23_IT_Gruppe5",
        host: "195.37.176.178",
        port: "20133",
        user: "23_IT_Grp_5",
        password: "JJQGNC8h79VkiSNmK}8I",
        multipleStatements: true
    });

    connection.connect((err) => {
        if (err) {
            console.error('Error connecting to the database:', err.stack);
            res.status(500).json({ error: 'Failed to connect to the database' });
            return;
        }

        console.log('Connected to the database');

        const query = `
      UPDATE item
      SET item_name = ?,
          item_description = ?,
          item_price = ?,
          stock = ?,
          employee_id = ?,
          best_before = ?,
          item_imgpath = ?
      WHERE item_ID = ?;

      DELETE FROM category_items WHERE ci_item_id = ?;

      INSERT INTO category_items (ci_category_id, ci_item_id)
      SELECT category_id, ? FROM category WHERE category_name IN (${item.categories.map(() => '?').join(', ')});
    `;

        const values = [
            item.item_name,
            item.item_description,
            item.item_price,
            item.stock,
            item.employee_id,
            item.best_before,
            item.item_imgpath,
            item.item_ID,
            item.item_ID,
            item.item_ID,
            ...item.categories
        ];

        connection.query(query, values, (err, result) => {
            if (err) {
                console.error('Error editing item:', err);
                res.status(500).json({ error: 'Failed to edit item' });
            } else if (result.affectedRows === 0) {
                res.status(404).json({ error: 'Item not found' });
            } else {
                console.log('Item edited successfully');
                res.status(200).json({ message: 'Item edited successfully' });
                handleItemChange();
            }
        });
    });
});

