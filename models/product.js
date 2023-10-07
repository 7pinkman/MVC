//const products = [];


const fs=require('fs');
const path=require('path');

const p = path.join(path.dirname(process.mainModule.filename),
    'data',
    'products.json'
    );

const getProductsFromFile = (cb) => {
    
    fs.readFile(p, (err, fileContent) => {
        if(err){
            cb([]);//execute the argument cb as a function to which i passed an empty array 
        }
        else{
            cb(JSON.parse(fileContent));//this two cb calls allow me to go to my controllers products.js file where i called fetchAll
        }
        
    });
 }



module.exports = class Product {
    constructor(t) {
        this.title = t;
    }
    /*
    save() {
        //products.push(this);
        const p = path.join(path.dirname(process.mainModule.filename),
        'data',
        'products.json'
        );
        fs.readFile(p,(err, fileContent) => {
            //console.log(fileContent);
            let products = [];
            if(!err){
                products = JSON.parse(fileContent);//using JSON object we call parse method to convert json data to array
            }
            products.push(this);//this refers to the class,here we need to use arrow function,otherwise this will lose its context and not refer to the class anymore.
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err);
            })
        });
    }*/
/*
    static fetchAll() {
        const p = path.join(path.dirname(process.mainModule.filename),
        'data',
        'products.json'
        );
        fs.readFile(p, (err, fileContent) => {
            if(err){
                return [];
            }
            return JSON.parse(fileContent);
        })
        //return products;
    }
}
*/
/*
 static fetchAll(cb) {
    const p = path.join(path.dirname(process.mainModule.filename),
    'data',
    'products.json'
    );
    fs.readFile(p, (err, fileContent) => {
        if(err){
            cb([]);//execute the argument cb as a function to which i passed an empty array 
        }
        cb(JSON.parse(fileContent));//this two cb calls allow me to go to my controllers products.js file where i called fetchAll
    });
    //return products;
 };
 */

 static fetchAll(cb) {
    getProductsFromFile(cb);
 };

 save() {
    getProductsFromFile(products => {
        products.push(this);//this refers to the class,here we need to use arrow function,otherwise this will lose its context and not refer to the class anymore.
        fs.writeFile(p, JSON.stringify(products), (err) => {
            console.log(err);
        });
    });
 }
}



