# Create a new user
`/signup` (POST)  
  
  
Send a POST request to `/signup` with these credentials 
  
### Headers:
```form
content-type: application/json
```
  
  
### JSON values

```json
{
  "user" : {
    "username": "akio",
    "email": "moyshik7@gmail.com",
    "name": "Your Name",
    "password": "YourPassword"
  }
}
```

## On success

  
It'll return a object with response code 200  

```json
{
    "code": 200,
    "message": "New user created"
}
```