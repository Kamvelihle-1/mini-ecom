const db = require('../config')
const {hash,compare} = require('bcrypt')
const {createToken} = require('../middleware/AuthonticateUser')

class Users{
    getUsers(req,res){
        const query =`
        SELECT userID, CONCAT(firstName,'',lastName)'User Name', emailAdd
        FROM Users;
        `
        db.query(query,(err,results)=>{
            if(err) throw err
            res.json({
                status:res.statusCode,
                results
            })
        })
    }
    getUser(req,res){
        const query =`
        SELECT userID,  CONCAT(firstName,'',lastName)'User Name', emailAdd
        FROM Users
        WHERE userID = ${req.params.id};
        `
        db.query(query,(err,result)=>{
            if(err) throw err
            res.json({
                status:res.statusCode,
                result
            })
            
        })
    }
    login(req,res){
        const {emailAdd, Password} = req.body
        
        const query = `
        SELECT  CONCAT(firstName,'',lastName)'User Name',
        emailAdd, userPwd
        FROM Users
        WHERE emailAdd = '${emailAdd}';
        `
        db.query(query, async (err, result)=>{
            if(err) throw err
            if(!result?.length){
                res.json({
                    status: res.statusCode,
                    msg: "You provided a wrong email."
                })
            }else {
                await compare(Password,
                    result[0].Password,
                    (compErr, compResult)=>{
                        if(compErr) throw compErr
                        // Create a token
                        let token =
                        createToken({
                            emailAdd,
                            Password
                        })
                        if(compResult) {
                            res.json({
                                msg: "You have logged in",
                                token,
                                result: result[0]
                            })
                        }else {
                            res.json({
                                status: res.statusCode,
                                msg:
                                "Invalid password or check if you have registered"
                            })
                        }
                    })
                }
        })
    }
   async register(req,res){
        const data =req.body
        data.Password = await hash(data.Password,15)
        //payload
        const user ={
            emailAdd : data.emailAdd,
            Password : data.Password
        }
        const query =`
        INSERT INTO Users
        SET ?
        `
        db.query(query,[data],(err)=>{
            if (err) throw err

            let token = createToken(user)
            res.json({
                status:res.statusCode,
                msg:"You are now registered."
            })
        })
    }
    updateUser(req,res){
        const data = req.body
        if(data.Password){
            data.Password = hashSync(data.Password,15)
        }
        const query =`
        UPDATE Users
        SET ? 
        WHERE userID = ${req.params.id};
        `
        db.query(query,[data],(err)=>{
            if(err) throw err
            res.json({
                status: res.statusCode,
                msg: "The user record has been updated "
            })
        })
    }
    deleteUser(req,res){
        const query =`
        DELET FROM Users
        WHERE userID = ${req.params.id};
        `
        db.query(query,(err)=>{
            if(err) throw err
            res.json({
                status: res.statusCode,
                msg: "The user record has been deleted."
            })
        })
    }
}

module.exports =Users