const express = require('express');
const app = express();
const { default: mongoose } = require("mongoose");
const WishListModel = require('./models/wishListModel/WishListModel')
const  ProductModel = require("./models/productModel/productModel") 
const connection = () => {
    mongoose.connect("mongodb://localhost:27017/e-commerce-app-test", { useNewUrlParser: true, authSource: "admin" })
    mongoose.connection.once('open', () => {
        console.log(`mongoose connected to "${process.env.DB_NAME}" ! `);
    })
}

connection();


async function  test(query){

   
    
    // const products = await ProductModel.pa.find({
    //     category:query.category ,
    //     ...query.color ? {'colors.name':query.color}: {},
    //     ...query.size ? {'colors.size':query.size}:{}
    // }
    //     ).sort({price:-1})
        
    // console.log(products.t)
   
    // return products
    const options = {
        page: 2,
        limit: 10,
      };
    const products = await ProductModel.paginate({category:"women"},options)
console.log(products)
  
}
test({category:"women"});
// const lengthOfProducts =async ()=>{
// //    const count = await   ProductModel.count();

// //    console.log( "res :", count)

// // var newnumber = (Math.round(1.8 * Math.pow(10, 1)) / Math.pow(10, 1)).toFixed(3);
// // console.log(newnumber);
// const number = Math.ceil(25.2);
// console.log(number)
   
// }

 app.get('/',async (req, res)=>{
    const filters = {
        ...req?.query?.category ? {'category':req?.query?.category}:{},
        ...req?.query?.color ? {'color':[req?.query?.color]} : {},
        ...req?.query?.size ? {'size':[req?.query?.size]} :{}}
    console.log(filters)
    const products  = await test(filters);
res.status(200).send(products)
   
})


 app.listen(5000, () => {
    console.log(`listening on port ${ 5000}`);
})
