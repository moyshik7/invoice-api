# Log in as existing user
  
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
    "password": "YourPassword"
  }
}
```

**Put either email or username**

## If request is success

It'll return a json encoded object   
  
```json
{
  "code": 200,
  "token": "c23df7f2850e28bb6013538b3b1deabc.9a4e4a6db82eb733a2b9fdfccd1eb6c0646d01df29b76040c11b4ec99cd844d4",
  "expires": 1626947293859
}
```
  
| Name      | Type        | Description                                                                    |
| --------- | ----------- |------------------------------------------------------------------------------- |
| code      | String      | [HTTP response code](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) |
| token     | String      | Authorization token which will be used to authorize the user                   |
| expires   | TimeInteger |When the token will expire. Will have to re login then                          |

