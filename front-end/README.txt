/******************************************************************************
 * Author: Ofek Tal                                                           *
 * Date: 08.05.2022                                                           *
 * Description: Project Supermarket-Store                                     *
 *                                                                            *
 ******************************************************************************/

Description:

  SPA that includes 4 pages:
  - /store - The main page.
             Displays the products in the store.
             The user can look at the products, and add them to his cart.
  - /cart -  Under the main page, the user can retrieve products from the store and make a buy.
  - /system - Page for the admins with authentication (email:ofektal570@gmail.com, pass:rootroot),
              in this page, you can add products to the store, delete products and change their prices.
  - /tracking: purchased products - this page displays the orders that the user made.
               price change - this page displays the history of the change in the product's price.

Technologies:
  Front: Angular 12 framework + Angular Material.
  Back: node.js + express, postgres DB, sequlize ORM.

How to Install and Run the Project:
  Install the zip and extract them.
  Dir:
    - supermarket-frontend
    - supermarket-backend
  Run:
  One process (supermarket-frontend):
   "npm install" to install the dependencies modules.
   "ng serve" to run the project in your localhost.

  Another process (supermarket-backend):
   "npm install" to install the dependencies modules.
   node server.js to run the server.
