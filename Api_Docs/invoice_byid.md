# Get information about a certain invoice
`/invoice/:id` (GET)  
  
  
Send a GET request to `/invoice/:id` (replace `:id` with the invoice id`)  
**(Authorization required)**  
**(You can only see your own invoices)**  
  
  
# On success
  
It'll return an JSON encoded invoice object like below  

```json
{
  "code": 200,
  "invoice": {
    "id": "8e0b2caf8eefa9fb96f044d3b433ee37",
    "title": "A new Clock",
    "description": "A new clock for dining room",
    "user": "646d01df29b76040c11b4ec99cd844d4",
    "payTo": "clock seller",
    "due": 1627207804410,
    "total": 6969,
    "stats": {
      "completed": false
    }
  }
}
```