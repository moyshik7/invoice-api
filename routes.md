# Routes
  
- `/(root)`
  - `/login` (POST) ✅  
  - `/signup` (POST) ✅  
  - `/user/:id` (GET) ✅  
  - `/invoice` (GET, POST) ✅ ✅ ✅
  - `/invoice/:id` (GET, POST, DELETE) ✅ ✅  
  - `/me` (GET, POST) ✅ 🛑 
    - `/due` (GET) ✅ 
    - `/pings` (GET) ✅ 

## Explanation
  
/(root): Nothing  
  
`/login` (POST): Log into your account and get auth token  
`/signup` (POST): Create a new account and get auth token  
`/user/:id` (GET): Get info about a user  
`/invoice` (GET): Get all invoice lost of an user  
`/invoice` (POST): Create a new invoice  
`/invoice/:id` (GET): Get information about a certain invoice (with id)  
`/invoice/:id` (POST): Update an invoice   
`/invoice/:id` (DELETE): Delete an invoice  
  
`/me` (GET): Get a list of invoices assigned to you (Both completed and not completed)  
`/me` (POST): Update your invoices (eg Payment completed)  
`/due` (GET): invoices that are not paid  
`/pings` (GET): Invoices that missed deadlines  
