const mongoose = require("mongoose");
const Q = require("q");

const DB_USER = "kamil";
const DB_PASSWORD = "kamil";

mongoose.Promise = Q.Promise;

mongoose.connect(`mongodb://${DB_USER}:${DB_PASSWORD}@ds135089.mlab.com:35089/kamil_biros_kurs_node`);

var schema = new mongoose.Schema({
	name: String,
	colour: Number
});

var product = mongoose.model("ShoppingList",schema);





function productList(cb){

	var def = Q.defer();

	product.find({}).exec(function(err,prod){

		if(err){
			def.reject(err);
		}
		else{
			def.resolve(prod);
		}

	});

	return def.promise;

}

function addProduct(value, cb){

	var def = Q.defer();

	product.findOne( {name: value.product} ).exec(function(err,prod){

		if(err){
			def.reject(err);
		}
		if(!prod){

			var newProduct = new product({
				name:value.product,
				colour: value.colour
			});

			newProduct.save(function(err,prod){

				if(err){
					def.reject(err);
				}
				else{
					def.resolve(prod.name);
				}
			});
		}
		
	});

	return def.promise;

}

function deleteProduct(id,cb){

	var def = Q.defer();

	product.findOne( {_id: id} ).exec(function(err,prod){

		if(err){
			def.reject(err);
		}
		else{
			product.findByIdAndRemove(id).exec(function(err,prod){
				
				if(err){
					def.reject(err);
				}
				else{
					def.resolve(prod.name);
				}

			});
		}

	});

	return def.promise;

}

function changeColour(id,value,cb){

	var def = Q.defer();

	product.findByIdAndUpdate(id, value).exec(function(err,user){

        if(err){
            def.reject(err);
        }
        else{
            def.resolve(user);
        }

    });

    return def.promise;

}





module.exports = {
	addProduct: addProduct,
	productList: productList,
	deleteProduct: deleteProduct,
	changeColour: changeColour
};