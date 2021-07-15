# Delete an existing invoice
`/invoice/:id` (DELETE)  
  
  
Send a DELETE request to `/invoice/:id` where :id is the id of the invoice.  
**(Authorization required)**  
  
## On success
  
The response will carry a 200 code and a successful message.  
  
**Example:**  
  
```json
{
  "code": 200,
  "message": "Successfully deleted invoice"
}
```