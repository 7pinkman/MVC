const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

//const db = require('./util/database');

const sequelize = require('./util/database');

const Product = require('./models/product');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
/*
db.execute('select * from products')
.then(result => {
    console.log(result);
})
.catch(err => {
    console.log(err);
})
*/

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req,res, next) => {
    User.findByPk(1).then(user => {
        req.user=user;//here we are adding a new field in a request object,here the field name is user.here right side user is
        // sequelize object not a javascript object
        next();
    }).catch(err => {
        console.log(err);
    });
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, {constraints: true, onDelete:'CASCADE' });

User.hasMany(Product);//this statement is optional as belongsto is already there before

sequelize
//.sync({force: true})//we use force to overwrite the table
.sync()
.then(result => {

    return User.findByPk(1);
    //console.log(result);
    //app.listen(3000);
})
.then(user => {
    if(!user) {
        return User.create({ name: 'Max', email:'test@test.com'});
    }
    return user;//its a object,but above 'return' returns a promise.so we can write like - Promise.resolve(user).but technically
    //we can write like this,as if we return a value in then block then it autmotacally wrap into a new promise.
})
.then(user => {
   //console.log(user);
   app.listen(3000);
})
.catch(err => {
    console.log(err);
})

//app.listen(3000);
