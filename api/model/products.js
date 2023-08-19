const db = require('../config')
class Products{
    getProducts(req,res){
        const query =`
        SELECT productID, ImageUrl,productName, Brand,Category,Price, Quantity
        FROM Products;
        `
        db.query(query,(err,results)=>{
            if(err) throw err
            res.json({
                status:res.statusCode,
                results
            })
        })
    }
    getProduct(req,res){
        const query =`
        SELECT productID, ImageUrl,productName, Brand,Category,Price, Quantity
        FROM Products
        WHERE productID = ${req.params.id};
        `
        db.query(query,(err,result)=>{
            if(err) throw err
            res.json({
                status:res.statusCode,
                result
            })
        })
    }
    updateProduct(req,res){
        const query =`
        UPDATE Products
        SET ?
        WHERE productID = ${req.params.id};
        `
        db.query(query,[req.body],(err)=>{
            if (err) throw err
            res.json({
                status:res.statusCode,
                msg:"This product has been updated"
            })
        })
    }
    deleteProduct(req,res){
        const query =`
        DELETE FROM Products
        WHERE productID = ${req.params.id};
        `
      db.query(query,(err)=>{
        if(err) throw err
        res.json({
            status:res.statusCode,
            msg:"This product has been deleted."
        })
      })
    }
    addProduct(req,res){
        const data =req.body
        const query =`
        INSERT INTO Products
        SET ? 
        `
        db.query(query,[data],(err)=>{
            if(err) throw err
            res.json({
                status:res.statusCode,
                msg:"This product has been added."
            })
        })
    }
}
module.exports = Products