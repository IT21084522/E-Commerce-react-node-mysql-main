const pool = require("../database/connection");

exports.getAllProducts = () => {
    return new Promise((resolve, reject) => {
        pool.query("SELECT * FROM product;", (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

exports.getProductDetailsById = (productId) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM product WHERE productId = ${productId};`;
        pool.query(query, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

exports.allOrderByProductId = (productId) => {
    return new Promise((resolve, reject) => {
        const query =
            `SELECT O.orderId, U.fname, U.lname, O.createdDate, PIN.quantity, PIN.totalPrice ` +
            `FROM users U INNER JOIN orders O on U.userId  = O.userId ` +
            `INNER JOIN productsInOrder PIN on O.orderId = PIN.orderId ` +
            `INNER JOIN product P on PIN.productId = P.productId ` +
            `WHERE PIN.productId = ${productId};`;

        pool.query(query, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

exports.createProduct = (name, price, description) => {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO product (name, price, description) VALUES ('${name}', ${price}, '${description}');`;
        pool.query(query, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

exports.updateProduct = (productId, name, price, description) => {
    return new Promise((resolve, reject) => {
        const query = `UPDATE product SET name = '${name}', price = ${price}, description = '${description}' WHERE productId = ${productId};`;  // Vulnerable query
        pool.query(query, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

exports.deleteProduct = (productId) => {
    return new Promise((resolve, reject) => {
        const query = `DELETE FROM product WHERE productId = ${productId};`;
        pool.query(query, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};
