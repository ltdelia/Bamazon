# Bamazon
An app for Node.js, utilizing npm prompt, and mySQL

# Introduction
Bamazon is a marketplace that lists out several items for sale to the customer, and allows the customer to select an item for purchase. 
The user will select an item by inputting its corresponding itemID, and then indicate the desired quantity. So long as there is enough of the product in stock, the order will be fulfilled.

# Installation
Bamazon is coded in JavaScript, and is meant to be used with Node.js on the command line. 

You can download Node.js here: https://nodejs.org/en/

In addition to node, there are two key npm packages required for this application to work successfully.

1. prompt (https://www.npmjs.com/package/prompt)
2. mysql (https://www.npmjs.com/package/mysql)

# The Bamazon Database

Below is the working script for the Bamazon database. 

![alt tag](https://raw.githubusercontent.com/ltdelia/Bamazon/master/Code%20Snippets/BamazonSQL.png)

The database contains a table entitled Products, which holds all of the marketplace data. The columns for Products include:

-ItemID (the unique ID for each item)
-ProductName (the name of the product)
-DepartmentName (the department the product belongs to)
-Price (the price of the product)
-StockQuantity (the quantity of the product in stock)

# Code Walkthrough

As of 4/22/2016, the current build includes Bamazon Customer. Future builds will include a Bamazon Manager view, as well as a Bamazon Executive view.

BamazonCustomer.js works with the Bamazon databse through SQL queries. 

![alt tag](https://raw.githubusercontent.com/ltdelia/Bamazon/master/Code%20Snippets/BamazonCustomer2.png)

The application sends a "SELECT" SQL query to gather the data for the Products table, then displays the data on the command line.
Data is also pushed to an array to be made available globally.

![alt tag](https://raw.githubusercontent.com/ltdelia/Bamazon/master/Code%20Snippets/BamazonCustomer3.png)

Here, the npm prompt package is incorporated for the user to choose an item from the marketplace, based on the itemID. The user is then prompted to indicate the quantity they wish to order.

![alt tag](https://raw.githubusercontent.com/ltdelia/Bamazon/master/Code%20Snippets/BamazonCustomer4.png)

Using the ID and quantity supplied from prompt, Bamazon Customer checks to see if the product is in stock, as well as if the quantity requested in the order can be satisfied. If the quantity requested is too high, the app will let the user know, and prompt the user to select another item at a different quantity. 

If the quantity requested can be satisfied, the app will send an "UPDATE" SQL query to update the quantity of the item in stock. The total cost of the order will then be calculated, and displayed to the user.

# Running

With Node.js installed, run the file in the command prompt like so:

node BamazonCustomer.js
