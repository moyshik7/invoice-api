# Update your information
`/me` (POST)  
  
  
Send a POST request to `/me` with user object which contains the details to be updated  
**(Authorization required)**  
  
**Example:**  

```json
{
  "user": {
    "name": "Akio Orochi"
  }
}
```
  
  
## On success
  
The response will be a 200 code and will bear a success message  
  
**Example:**  
  
```json
{
  "code": 200,
  "message": "Updated"
}
```