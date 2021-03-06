Author: Ofek Tal
Date: 13.05.2022
Description: Supermarket-Store
------------------------------------------------
Description:

SPA that includes 5 pages:

/store - The main page displays the products in the store. 
         Product details: name, price, amount, percentage change from the last price, if there is a discount, the last price is displayed. 
         The user reviews the products list and can add them to his cart.

/cart -  Located under the main page, it displays the cart details. 
         Each row displays the image of the product, name, quantity, and total price.
         The user can change the quantity for each product, the type of shipping, and add a coupon code. 
         At the bottom, there is the total price according to the cart details and the checkout option.

/system - Admins page with authentication (email:ofektal570@gmail.com, password:rootroot), 
          on this page the admin can add products to the store: name, price, amount, and image (optional). 
          Also, the admin can change the product's prices and delete them from the store.

/history: /orders - Displays all the user's orders and their details. 
          /prices - Displays the changes in the prices of the products that exist in the store.

The server can update the project's prices in real-time (connect to the client by socket.io).

Technologies: 
      Front: Angular 12 framework + Angular Material + Bootstrap. 
      Back: node.js + express, postgres DB(with sequelize ORM), socket-io.

How to Run the Project:

Run: 
  One process (supermarket-frontend): 
  "npm install" to install the dependencies modules. 
  "ng serve" to run the project in your local host.

Another process (supermarket-backend + postgres DB): 
  runs on the web.