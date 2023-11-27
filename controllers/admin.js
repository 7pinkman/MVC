const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  //console.log('ab');
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
    /*
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true
    */
  });
};
/*
exports.postAddProduct = (req, res, next) => {
  
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null,title, imageUrl, description, price);
  console.log(title);
  product.save();
  res.redirect('/');
};
*/

/*
exports.postAddProduct = (req, res, next) => {
  
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null,title, imageUrl, description, price);
  product
    .save()
    .then(() => {
      res.redirect('/');
    })
    .catch(err => console.log(err));
};

*/

/*
exports.postAddProduct = (req, res, next) => {
  
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  Product.create({
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description
  })
  .then(result => {
    console.log(result);
    res.redirect('/admin/products')
  })
  .catch(err => {
    console.log(err);
  });
};

*/

exports.postAddProduct = (req, res, next) => {
  
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  req.user
  .createProduct({
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description
  })
  /*
  Product.create({
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description,
    //userId: req.user.id//we don't need to use this if we use above magic sequelize menthod
  })
  */
  .then(result => {
    console.log(result);
    res.redirect('/admin/products')
  })
  .catch(err => {
    console.log(err);
  });
};


/*

exports.getEditProduct = (req, res, next) => {
  console.log('ab');
  const editMode = req.query.edit;
  if(!editMode){
    return res.redirect('/');
  }
  
  const prodId = req.params.productId;
  console.log(prodId);
  Product.findById(prodId, product => {
    
    if(!product){
      return res.redirect('/');
    }
    
    
    res.render('admin/edit-product', {
      pageTitle: 'Add Product',
      path: '/admin/add-product',
      editing : editMode,
      product : product
    });
  })
  
};
*/
/*
exports.getEditProduct = (req, res, next) => {
  console.log('ab');
  const editMode = req.query.edit;
  if(!editMode){
    return res.redirect('/');
  }
  
  const prodId = req.params.productId;
  console.log(prodId);
  Product.findByPk(prodId).then(product => {
    
    if(!product){
      return res.redirect('/');
    }
    
    
    res.render('admin/edit-product', {
      pageTitle: 'Add Product',
      path: '/admin/add-product',
      editing : editMode,
      product : product
    });
  }).catch(err => console.log(err));
  
};
*/

exports.getEditProduct = (req, res, next) => {
  console.log('ab');
  const editMode = req.query.edit;
  if(!editMode){
    return res.redirect('/');
  }
  
  const prodId = req.params.productId;
  req.user.getProducts({where : {id: prodId }})//here we got an array even if we got one element
  //console.log(prodId);
 // Product.findByPk(prodId).then(product => {
  .then(products => {
    const product = products[0];
    if(!product){
      return res.redirect('/');
    }
    
    
    res.render('admin/edit-product', {
      pageTitle: 'Add Product',
      path: '/admin/add-product',
      editing : editMode,
      product : product
    })
  })
  .catch(err => console.log(err));
  
};

/*
exports.postEditProduct = (req, res, next ) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  const updatedProduct = new Product(prodId, updatedTitle, updatedImageUrl, updatedDesc, updatedPrice);
  updatedProduct.save();
  res.redirect('/admin/products');
}
*/

exports.postEditProduct = (req, res, next ) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  Product.findByPk(prodId)
    .then(product => {
      product.title= updatedTitle;
      product.price= updatedPrice;
      product.description= updatedDesc;
      product.imageUrl= updatedImageUrl;
      return product.save();
    })
    .then(result => {
      console.log('UPDATED PRODUCT!');
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
  
  
}


/*

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  });
};

*/
/*
exports.getProducts = (req, res, next) => {
  Product.findAll()
  .then(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    })
  })
  .catch(err => console.log(err));
};
*/

exports.getProducts = (req, res, next) => {
  req.user
  .getProducts()
  .then(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    })
  })
  .catch(err => console.log(err));
};


/*
exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.deleteById(prodId);
  res.redirect('/admin/products');
};
*/


exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByPk(prodId)
   .then(product => {
    return product.destroy();
   })
   .then(result => {
    console.log('DESTROYED PRODUCT!');
    res.redirect('/admin/products');
   })
  
  
};
