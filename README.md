# Invoice app
  
[Api Documentation](https://moyshik7.gitbook.io/invoice-api/)  
  
## Running the app 
  
First clone this repository with  
```bash
git clone https://github.com/moyshik7/invoice-api.git
```
  
Then install the modules  
(For general use)  
```bash
npm install
```
(For production use)  
```bash
npm ci
```
Set the environment variables  
```bash
#Your Database url (mongo)
DB_URL="http://localhost:27017/"
#Your Database name (default "Invoice")
DB_NAME="Invoice"
#The port the app will listen to (default 3000)
PORT=3000
```
  
Start the app  
```bash
npm start
```
  
Transpile to js for production use  
```bash
npx tsc
```