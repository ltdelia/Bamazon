/// requiring the npm mysql and the npm prompt in our file
var mysql = require('mysql');
var prompt = require('prompt');

// Creates the properties so that we can connect our server.js file to the mysql database
var connection  = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "_____________",
	database: "Bamazon"
});

// This is an empty array, which will later store the Bamazon database
var marketplace = [];

// Actually initiates the connection
connection.connect(function(err){

	// If there is an error, log it
	if(err){
		console.error("error connecting: " + err.stack);
		return;
	}

	// If we're connected, let us know to which thread
	console.log("connected as id " + connection.threadID);
});

// Perform a query to display all of the items for sale
connection.query("SELECT itemID, ProductName, DepartmentName, Price, StockQuantity from Products", function(err, res){
	if(err){
		throw err
	}else{
		console.log("Welcome to Bamazon! Your savings await you.")
		console.log("******************************************************");
		console.log("ID    Product Name       Department       Price");
		for(var i=0; i<res.length; i++){
			console.log(res[i].itemID, res[i].ProductName, res[i].DepartmentName, res[i].Price);
			marketplace.push(res[i]);
		}
		UserPrompt();
	}
})

// Prompt the user for the productID of the product they wish to purchase, as well as the quantity
function UserPrompt(){
	prompt.start()

	// We are requiring each variable in prompt to avoid skipped variables for Windows users
	var schema = {
		properties:{
			itemID:{
				message: "Please enter the ID for the product you wish to purchase.",
				required: true
			},
			itemQuantity:{
				message: "How many of this product do you wish to purchase?",
				required: true
			}
		}
	}

	// Prompt the user for the schema above -- the itemID and the itemQuantity
	prompt.get(schema, function(err, result){
		if(err){
			throw err
		}else{			
			var ID = result.itemID;
			var quantity = result.itemQuantity;
		}
		console.log(ID);
		console.log(quantity);
		QuantityCheck(ID, quantity);
	})
}

function QuantityCheck(ID, quantity){

	console.log("checking the quantity...");
	
	for(var i=0; i<marketplace.length; i++){
		// check that the ID requested by the user matches an ID in marketplace
		if(ID == marketplace[i].itemID){			
			// check if the order can be fulfilled based on quantity
			if(quantity > marketplace[i].StockQuantity){
				console.log("Insufficient quantity. Order cannot go through. Please try again.");
				UserPrompt();
			}else if(quantity < marketplace[i].StockQuantity){
				// decrease the stockQuantity by the ordered quantity
				// update Bamazon database to reflect remaining quantity
				var newQuantity = marketplace[i].StockQuantity - quantity;
				connection.query("UPDATE Products SET StockQuantity="+newQuantity+" WHERE StockQuantity="+marketplace[i].StockQuantity, function(err, res){
					if(err){
						throw err
					}else{
					}
				})
				var cost = marketplace[i].Price * quantity;	
				console.log("Transaction successful! Total cost is: " + cost);
			}
		}
	}
}	