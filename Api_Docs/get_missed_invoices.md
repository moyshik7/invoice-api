# Get invoices that you missed
`/me/pings` (GET)  
  
  
Send a GET request to `/me/pings`  
**(Authorization required)**  
  
  
## On success
  
The response will carry all invoices that are not paid and missed deadline  
  
  
**Example:**  
  
```json
{
  "code": 200,
  "invoices": [
    {
      "id": "3ad2092f25ae0f2f79f51c8db25e4ccc",
      "title": "An oven",
      "description": "An oven bought from Walmart",
      "user": "646d01df29b76040c11b4ec99cd844d4",
      "payTo": "Walmart",
      "due": 1626360271,
      "total": 699,
      "stats": {
        "completed": false
      }
    }
  ]
}
```