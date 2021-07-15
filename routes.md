# Routes
  
- `/(root)`
  - `/login` (POST) ✅  
  - `/signup` (POST) ✅  
  - `/user/:id` (GET) ✅  
  - `/invoice` (GET, POST) ✅ ✅ 
  - `/invoice/:id` (GET, POST, DELETE) ✅ ✅ ✅
  - `/me` (GET, POST) ✅ ✅
    - `/due` (GET) ✅ 
    - `/pings` (GET) ✅ 

## Explanation
  
/(root): Nothing  
`/user/:id` (GET): Get info about a user  
`/invoice` (GET): Get a list of all your invoices
`/invoice` (POST): Create a new invoice  
`/invoice/:id` (GET): Get information about a certain invoice (with id)  
`/invoice/:id` (POST): Update an invoice   
`/invoice/:id` (DELETE): Delete an invoice  
