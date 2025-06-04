const bcrypt = require('bcrypt');
const password = "#01Production@"; // À remplacer
bcrypt.hash(password, 12).then(console.log);