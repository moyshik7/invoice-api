# Routes
  
- `/(root)`
  - `/login` (POST)
  - `/signup` (POST)
  - `/user` (GET, POST)
  - `/invoice` (GET, POST)
  - `/invoice/:id:` (GET, POST, DELETE)
  - `/assign` (POST, DELETE)
  - `/me` (GET, POST)
    - `/due` (GET)
    - `/pings` (GET)

## Explanation
  
/(root): Nothing  
  
:x: /login (POST): Log into your account and get auth token  
:x: /signup (POST): Create a new account and get auth token  
:white_check_mark: /user (GET): Get info about a user  
:white_check_mark: /user (POST): Update info about a user  
:white_check_mark: /invoice (GET): Get all invoice lost of an user  
:white_check_mark: /invoice (POST): Create a new invoice  
:white_check_mark: `/invoice/:id:` (GET): Get information about a certain invoice (with id)  
:white_check_mark: `/invoice/:id:` (POST): Update an invoice   
:white_check_mark: `/invoice/:id:` (DELETE): Delete an invoice  
:white_check_mark: /assign (POST): Assign an invoice to someone (Tell someone to pay) By default the user creating an invoice will be the one to pay. But you can change that.  
:white_check_mark: /assign (DELETE): Remove assignment from someone. If the person removed is the last parson of the assignment then it can't be removed before selecting another user  
  
:white_check_mark: /me (GET): Get a list of invoices assigned to you (Both completed and not completed)  
:white_check_mark: /me (POST): Update your invoices (eg Payment completed)  
:white_check_mark: /due (GET): invoices that are not paid  
:white_check_mark: /pings (GET): Invoices that missed deadlines  
