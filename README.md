
  Author: Ofek Tal                                                           
  Date: 13.05.2022                                                           
  Description: Project Supermarket-Store                                     
                                                                        


Description:

  SPA that includes 4 pages:
  - /store - The main page.
             Displays the products in the store.
             Each product has a name, price, amount, the change in percentage from the previous price, 
             and if the price is in the sale, the last price displays too.
             The user can look at the products, and add them to his cart.
     
  - /cart - Under the main page, the user has his cart.
            Each row displays the image of the product, name, qty, and total price.
            The user can change the qty by entering a number, he can also retrieve products from the store.
            In the Summary of the cart, the user selects a type of shipping and presses the coupon code (if there is any).
            At the bottom, there is the total price and the option to make checkout.
             
  - /system - Page for the admins with authentication (email:ofektal570@gmail.com, pass:rootroot),
              On this page, you can add products to the store: name, price, amount, and image (optional).
              Also, you can change the product's prices and delete them from the store.
              The server can update the project's prices in real-time (connect to the client by socket.io)
              
  - /tracking: orders - this page displays the orders that the user made, the prices of the products are the prices when he made the checkout.
               prices - this page displays the changes in the prices of the products that exist in the store.

Technologies:
  Front: Angular 12 framework + Angular Material + bootstrap.
  Back: node.js + express, postgres DB(with sequlize ORM), socket-io.

How to Install and Run the Project:
  Install the zip and extract them.
  Dir:
    - supermarket-frontend
    - supermarket-backend
  Run:
  One process (supermarket-frontend):
   "npm install" to install the dependencies modules.
   "ng serve" to run the project in your local host.

  Another process (supermarket-backend): runs on the web.
  
