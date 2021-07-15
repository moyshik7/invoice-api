# List all invoices of a user 
  
`/invoice` (GET)  
  
  
Send a GET request to `/invoice`    
**(Authentication required)**
  
  
# On success
  
It'll return a json string with an array of invoices  
  
```json
{
  "code": 200,
  "invoices": [
    {
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
    }, {
      "id": "se0b2caf8eefa9hsgsggs4d3b433eeb7",
      "title": "A TV",
      "description": "A new TV for the new PS5",
      "user": "646d01df29b76040c11b4ec99cd844d4",
      "payTo": "Wallmart",
      "due": 1627207904410,
      "total": 420000,
      "stats": {
        "completed": true
      }
    }
  ]
}
```
