# Get your own information
`/me` (GET)  
  
  
Send a GET request to `/me`  
**(Authorization required)**  
  
  
## On success
  
It'll return a JSON encoded User object  
**Example:**  

```json
{
  "code": 200,
  "user": {
    "id": "646d01df29b76040c11b4ec99cd844d4",
    "username": "akio",
    "email": "akio@plubin.xyz",
    "name": "Akio",
    "joined": 1626083571927,
    "admin": false,
    "password": "753c9497a6469532904e0c8aa0c7c7c7"
  }
}
```
