var express=require('express');
var http=require('http');
var mysql=require('mysql');
var app=express();
var bodyParser=require('body-parser');

app.use(bodyParser.urlencoded({extended:true}));
/*
var dateFormat=require('dateformat');
var now=new Date();
*/
app.set('view engine','ejs');
app.use('./js',express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('./js',express.static(__dirname + '/node_modules/tetcher/dist/js'));
app.use('./js',express.static(__dirname + '/node_modules/jquery/dist'));
app.use('./js',express.static(__dirname + '/node_modules//dist/css'));

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "crud"
});

const siteTitle="CRUD application";
const baseURL="http://localhost:4000/";

 app.get('/',function(req,res)
 {
 	
  	con.query("SELECT *FROM item123 ORDER BY id DESC",function(err,result){
    
    console.log(result);
 res.render('pages/index',{
 	siteTitle :siteTitle,
 	pageTitle : "Item list",
 	items : result
 	 });
}); });
 

 app.get('/event/add',function(req,res)
 {
 	
  //	con.query("SELECT *FROM item123 ORDER BY id DESC",function(err,result){
    
    
 res.render('pages/add-event.ejs',{
 	siteTitle :siteTitle,
 	pageTitle : "Add new item",
 	items : ''
 	 });
}); //});
 

app.post('/event/add',function(req,res){
	
	  var query= "INSERT INTO `item123`(id , name, description, url) VALUES (";
	  
	
	  query+= " '"+req.body.id+"',";
	  query+= " '"+req.body.name+"',";
      query+= " '"+req.body.description+"',";
	  query+= " '"+req.body.url+"')";

      con.query(query, function(err, result){
      res.redirect(baseURL);
}); 
});


app.get('/event/edit/:item_id',function(req,res){

 con.query("SELECT * FROM item123 WHERE id ='"+ req.params.item_id +"'",function(err, result) {
  
  result[0].id=result[0].id;
  res.render('pages/edit-event',{
    siteTitle : siteTitle,
    pageTitle : "Edit item : "+ result[0].name,
    item : result
  });
});
});


app.post('/event/edit/:item_id',function(req,res){

	var query="UPDATE `item123` SET";
	query +="`name`='"+req.body.name+"',";
	query +="`description`='"+req.body.description+"',";
	query +="`url`='"+req.body.url+"'";
	query +="WHERE `item123`.`id`= " +req.body.id+"";
 con.query(query, function(err,result){
     if(result.affectedRows)
     {
     	res.redirect(baseURL);
     };

});
});


app.get('/event/delete/:item_id',function(req,res){

	con.query("DELETE FROM item123 WHERE id='"+req.params.item_id+"'",function(err, result){

 if(result.affectedRows)
 {
 	res.redirect(baseURL);
 }

}); });

var server=app.listen(4000,function(){
console.log(" Server started on 4000....");

});
