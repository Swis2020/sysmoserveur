'use strict';
var dbConn = require('./../../config/db.config');
//produits object create
// display add produit page  (`nom`,`reference`,`categorie`,`prix`,`disponibilite`,`description`

var Produit = function (produit) {
  this.id = produit.id;
  this.nom = produit.nom;
  this.reference = produit.reference;
  this.categorie = produit.categorie;
  this.prix = produit.prix;
  this.disponibilite = produit.disponibilite;
  this.description = produit.description;
  this.product_first_img = produit.firstPicture;
  this.created_at = produit.created_at;
  this.updated_at = produit.updated_at;
  this.featured_product = produit.featured_product;
};

Produit.getLastId = (callback) => {
  dbConn.query("SELECT MAX(id) FROM produits", (err, res) => {
    if (err) {
      console.log('cannot get the last id ');
      return 0
    } else {
      return callback(res[0]['MAX(id)'] + 1);
    }
  })
}
Produit.create = (newProd, result) => {
  dbConn.query("INSERT INTO produits set ?", newProd, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    }
    else {
      //console.log(newProd.id);
      result(null, newProd.id);
    }
  });
};

Produit.findById = (id, result) => {
  dbConn.query("Select * from produits where id = ? ", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    }
    else {
      result(null, res);
    }
  });
};

Produit.findByCategorie = (id, result) => {
  dbConn.query("Select * from produits where categorie = ? ", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    }
    else {
      result(null, res);
    }
  });
};

Produit.findFeaturedProduct = (id, result) => {
  dbConn.query("SELECT * FROM produits where featured_product = 1;", (err, res) => {
    if (err) {
      console.log("error", err);
      result(err, null);
    } else {
      result(null, res);
    }
  })
}

Produit.findAll = (result) => {
  dbConn.query("Select * from produits", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    }
    else {
      //console.log('produits : ', res);
      result(null, res);
    }
  });
};
// display add produit page  (`nom`,`reference`,`categorie`,`prix`,`disponibilite`,`description`
Produit.update = (id, produit, result) => {
  dbConn.query("UPDATE produits SET ? WHERE id = ?;", [produit, id], function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

Produit.delete = (id, result) => {
  dbConn.query("DELETE FROM produits WHERE id = ?", [id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    }
    else {
      result(null, res);
    }
  });
};

module.exports = Produit;