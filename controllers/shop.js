const Product = require('../models/product');
const Cart = require('../models/cart');

/*
exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  });
};

*/
/*
exports.getProducts = (req, res, next) => {
  Product.fetchAll().then(([rows, fieldData]) => {
    res.render('shop/product-list', {
      prods: rows,
      pageTitle: 'All Products',
      path: '/products'
    });
  })
  .catch(err => console.log(err));
  
} 
*/

exports.getProducts = (req, res, next) => {
  Product.findAll()
  .then(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  })
  .catch(err => {
    console.log(err);
  });
  
} 


/*
exports.getProduct = (req, res, next ) => {
  const prodId = req.params.productId;
  console.log(prodId);
  Product.findById(prodId, product => {
    //console.log(product);
    res.render('shop/product-detail', 
    {product: product,//left side product which we are passing to view and reight side product is parameter of findById
    pageTitle: product.title,
    path: '/products'}); 
  })
  
}
*/
/*
exports.getProduct = (req, res, next ) => {
  const prodId = req.params.productId;
  console.log(prodId);
  Product.findById(prodId)
    .then(([product]) => {
      res.render('shop/product-detail', {
        product: product[0],//left side product which we are passing to view and reight side product is parameter of findById
        pageTitle: product.title,
        path: '/products'
      });
    })
    .catch(err => console.log(err));  
  
}


*/

exports.getProduct = (req, res, next ) => {
  const prodId = req.params.productId;
  console.log(prodId);
  Product.findAll({where : { id: prodId}})
  .then(products => {
    res.render('shop/product-detail', {
      product: products[0],
      pageTitle: products[0].title,
      path: '/products'
    });
  })
  .catch(err => console.log(err));  
  //two way we can fetch data
  /*
  Product.findByPk(prodId)
    .then(product => {
      res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products'
      });
    })
    .catch(err => console.log(err));  
    */
  
}
/*
exports.getIndex = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  });
};
*/

/*
exports.getIndex = (req, res, next) => {
  Product.fetchAll()
  .then(([rows, fieldData]) => {
    res.render('shop/index', {
      prods: rows,
      pageTitle: 'Shop',
      path: '/'
    });
  })
  .catch(err => console.log(err));
  
};
*/

exports.getIndex = (req, res, next) => {
  Product.findAll()
  .then(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  })
  .catch(err => {
    console.log(err);
  });
  
};




exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your Cart' 
  });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;//in ejs we name it as productId
  //console.log(prodId);
  console.log(prodId);
  Product.findById(prodId, product => {
      Cart.addProduct(prodId, product.price)
  });
  res.redirect('/cart');
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
