# Update your information
`/invoice/:id` (POST)  
  
  
Send a POST request to `/invoice/:id` where `:id` with user object which contains the details to be updated  . Here `:id` represent invoice id
**(Authorization required)**  
  
**Example:**  

```json
{
  "invoice": {
    "total": 699
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