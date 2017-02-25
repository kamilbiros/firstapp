const express = require("express");
const bodyParser = require("body-parser");
const api = require("./api");
const app = express();


app.use(express.static("public"));

app.use(bodyParser.json());

app.get("/",function(req,res){

	res.send("witam!");

});

app.post("/api/products", function(req,res){

	api.addProduct(req.body)
	.then(product => res.json({product:product}))
	.catch(err => res.status(404).send("Not Found"));


	// api.addProduct(req.body, function(err,product){

	// 	if(err){
	// 		res.status(404).send("Not Found");
	// 	}
	// 	else{
	// 		res.json({
	// 			product:product
	// 		});
	// 	}

	// });

});

app.get("/api/products",function(req,res){

	api.productList()
		.then(products => res.json({ products:products }))
		.catch(err => res.status(404).send("Not Found"));

	// api.productList(function(err,products){

	// 	if(err){
	// 		res.status(404).send("Not Found");
	// 	}
	// 	else{
	// 		res.json({
	// 			products:products
	// 		});
	// 	}

	// });

});

app.delete("/api/product/:id",function(req,res){


	api.deleteProduct(req.params.id)
		.then(product => res.json({product:product}))
		.catch(err => res.status(404).send("Not Found"));

	// api.deleteProduct(req.params.id, function(err,product){

	// 	if(err){
	// 		res.status(404).send("Not Found");
	// 	}
	// 	else{
	// 		res.json({
	// 			product:product
	// 		});
	// 	}

	// });

});

app.put("/api/product/:id",function(req,res){

	api.changeColour(req.params.id,req.body)
	.then(product => res.json({product:product}))
	.catch(err => res.status(404).send("Not Found"));

	// api.changeColour(req.params.id,req.body, function(err,product){

	// 	if(err){
	// 		res.status(404).send("Not Found");
	// 	}
	// 	else{
	// 		res.json({
	// 			product:product
	// 		});
	// 	}

	// });

});




app.listen(process.env.PORT || 8080, function() {

    console.log("Serwer został uruchomiony pod adresem http://localhost:8080");

});