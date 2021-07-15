# Create new invoice
`/invoice` (POST)  
  
  
Send a POST request to `/invoice` with the below values  
**(Authentication required)**  

```json
{
  "invoice" : {
    "title": "A new Clock",
    "description": "A new clock for dining room",
    "payTo": "clock seller",
    "due": 1627207804410,
    "total": 6969
  }
}
```
  
## On success
  
It's return a json encoded Invoice object like below  
  
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
    },
    "_id": "60f00a2cfa9934045ba554b4"
  }
}
```
