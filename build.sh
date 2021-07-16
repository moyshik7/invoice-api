echo "Installing node modules"
npm ci

echo "Transpiling TS to JS"
npx tsc

echo "Setting environment variables"
DB_URL="mongodb://localhost:27017/"
DB_NAME="Invoice"
PORT="3000"

echo "Launching app"
node .
