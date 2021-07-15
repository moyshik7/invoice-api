# Get information about an user
`/user/:id` (GET)  
  
  
Send a GET request to `/user/:id` where `:id` is the user id  
**(Authorization required)**  
  
## On success
  
The result will include a JSON encoded user data  
  
  
**Example:**  
  
```json
{
  "code": 200,
  "user": {
    "id": "646d01df29b76040c11bxxxxxxxxxxx",
    "username": "akio",
    "email": "akio@plubin.xyz",
    "name": "Akio Orochi",
    "joined": 1626083571927,
    "admin": false,
    "password": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  }
}
```
