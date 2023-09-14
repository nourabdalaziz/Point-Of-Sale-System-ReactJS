<p align="center">
    <img src="https://user-images.githubusercontent.com/62269745/174906065-7bb63e14-879a-4740-849c-0821697aeec2.png#gh-light-mode-only" width="40%">
    <img src="https://user-images.githubusercontent.com/62269745/174906068-aad23112-20fe-4ec8-877f-3ee1d9ec0a69.png#gh-dark-mode-only" width="40%">
</p>


# Point Of Sale System 

## Introduction
A POS application system is a tool that let you manage sales inventory and accept payments from customers.   
This system will help its owners to manage their sales in such a convenient way. It provides the ability to add, delete, update products and categories with full managing of cart.
<br>


## Technologies 

<img src="https://www.vectorlogo.zone/logos/firebase/firebase-icon.svg" width="40" height="40"/> <img src="https://www.vectorlogo.zone/logos/w3_css/w3_css-official.svg" width="40" height="40"/> <img src="https://www.vectorlogo.zone/logos/reactjs/reactjs-icon.svg" width="40" height="40"/> <img src="https://user-images.githubusercontent.com/4060187/61057426-4e5a4600-a3c3-11e9-9114-630743e05814.png" width="40" height="40"/>

## Features and Views                                  

- #### Login Page

 This is the page that will appear for the admin when he opens the website to access the system. Incorrect email or password will display an error until you enter the correct credentials.

 Login Credentials: 
     - email:  admin@pos.com
     - password:  123456

<img src="https://user-images.githubusercontent.com/108607595/199681786-22f351ff-dccb-49c9-8a11-7b0fe581de72.PNG" width ="40%"/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <img src="https://user-images.githubusercontent.com/108607595/199684780-90d0ce5e-1010-4862-9627-c0230560648d.PNG" width ="40%" />

<br>
<br>
<br>

- #### POS Page 

This is the main page that will appear for the admin after success login. Here, you, as an admin, will be able to add the products to the cart,       
increase or decrease the quantity of any product in the cart or delete it totally from the cart. You will be able to apply a tax and discount on the cart total too.

<img src="https://user-images.githubusercontent.com/108607595/199688230-bc54943c-253a-4038-bf5b-832b5f06f7ec.PNG" width ="45%"/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <img src="https://user-images.githubusercontent.com/108607595/199691152-fe5f8d6c-9f8f-4b8d-9045-cde4b1a4c9b7.PNG" width ="45%" />

<br>
<br>
<br>

- #### Categories Page

In this page, the admin will be able to add, delete and update the categories of his inventory with an easy, user-friendly and convenient user interface.
He will be able to search for a specified category using the search bar. As he is typing in the search bar, the results will be more specific and changed synchronously.       
    
Deleting a category, will automatically delete all the products related to this category, so products and pos pages will be updated directly.  
Updating a category will also automatically update all products related to this category in products and POS pages.

<div align="center">
   <img src="https://user-images.githubusercontent.com/108607595/199691744-5dcbd953-9fe8-42e8-8062-c4a1e9f8c41e.PNG" width ="60%"/>
</div>

The following form will come up when the admin clicks on Add-Category button to add a new category to the categories table. On bluring, the field will be checked if it is filled or not (it is required field). If not, then a red messege will appear under the field showing that the field is required.   

The same form will pop up when clicking on updating icon for a specific category but the field will be filled with the selected category data as initial values.     

Submitting the form will add anew category to the table and cancelling the process by clicking on 'cancel' button will close the pop up form with no changes occured on the table. 

<div align="center">
    <img src="https://user-images.githubusercontent.com/108607595/200154464-d8741d03-50fc-457e-9124-e653c49e735e.PNG" width ="60%"/>
</div>
<br>
<br>
<br>

- #### Products Page

In this page, the admin will be able to add, delete and update the products of his inventory with an easy, user-friendly and convenient user interface.
He will be able to search for a specified product with its name, code, category or price using the search bar. As he is typing in the search bar, the   results will be more specific and changed synchronously.

<div align="center">
   <img src="https://user-images.githubusercontent.com/108607595/199692826-5aa57ba5-cbab-4bba-a623-c1b1c4880988.PNG" width ="60%"/>
</div>     


The following form will come up when the admin clicks on Add-Product button to add a new product to the products table. On bluring, the fields will be checked if they are filled or not (they're required). If not, then a red messege will appear under the unfilled field showing that the field is required. 
Code and price fields will also be checked for containing only positive number, and image url field will be checked for containing a valid url.

The same form will pop up when clicking on updating icon for a specific product but the fields will be filled with the selected product data as initial values.    

Submitting the form will add anew product to the table and cancelling the process by clicking on 'cancel' button will close the pop up form with no changes occured on the table. 


<div align="center">
    <img src="https://user-images.githubusercontent.com/108607595/200154651-ffd969ec-7a4a-4b26-b621-5aef770d5d98.PNG" width ="60%"/>
</div>



## How to set up the project

- Clone this respository to your computer
- Access to the project folder on the computer via Termaial or Git Bash
- Excute `npm install` to download all necessary packages
- Execute ` npx json-server --watch data/db.json --port 5000` to start the json server
- Excute `npm run dev` to start the project

