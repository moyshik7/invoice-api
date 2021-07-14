# Routes
  
- `/(root)`
  - `/login` (POST) ✅  
  - `/signup` (POST) ✅  
  - `/user/:id` (GET) ✅  
  - `/invoice` (GET, POST) 🛑 🛑 
  - `/invoice/:id` (GET, POST, DELETE) ✅ 🛑 ✅  
  - `/me` (GET, POST) ✅ 🛑 
    - `/due` (GET) ✅ 
    - `/pings` (GET) ✅ 

## Explanation
  
/(root): Nothing  
  
:x: /login (POST): Log into your account and get auth token  
:x: /signup (POST): Create a new account and get auth token  
:white_check_mark: /user/:id (GET): Get info about a user  
:white_check_mark: /invoice (GET): Get all invoice lost of an user  
:white_check_mark: /invoice (POST): Create a new invoice  
:white_check_mark: `/invoice/:id` (GET): Get information about a certain invoice (with id)  
:white_check_mark: `/invoice/:id` (POST): Update an invoice   
:white_check_mark: `/invoice/:id` (DELETE): Delete an invoice  
  
:white_check_mark: /me (GET): Get a list of invoices assigned to you (Both completed and not completed)  
:white_check_mark: /me (POST): Update your invoices (eg Payment completed)  
:white_check_mark: /due (GET): invoices that are not paid  
:white_check_mark: /pings (GET): Invoices that missed deadlines  
