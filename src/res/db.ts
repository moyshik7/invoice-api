/**
 * Import types 
 */
import { Db } from 'mongodb'
import { Invoice, Snowflake, TimeInteger, Tokens, User } from './../typings'

/**
 * Import modules 
 */
import { MongoClient } from 'mongodb'

/**
 * This is the database constructor. 
 * But unfortunately we can't call it with new Database() because class constructor can't be asynchronous 
 * So we have to use Database.connect() method 
 * It'll create a new instance of the original class and return it 
 */
export class Database {
    private dbName: string;
    private db: Db;
    
    constructor(_db: Db, _dbName: string){
        this.db = _db
        this.dbName = _dbName;
    }
    /** 
     * This'll create a new instance of Database class and return it. 
     * Using it because constructor can't be async 
     * @returns Promise<Database> 
     */
    static async connect(_uri: string, __dbName: string): Promise<Database> {
        /**
         * Returning a new promise. 
         * It'll be resolved with a Database instance or rejected 
         */
        return new Promise((resolve: (__db: Database) => void, reject: () => void) => {
            /**
             * Creating a mongodb client 
             */
            const client = new MongoClient(`${_uri}${__dbName}`, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            /**
             * Connecting to the Database 
             */
            client.connect().then((_database: Db) => {
                /** 
                 * If connection is successful it'll create a new Database() 
                 */
                const _db = _database.db(__dbName)
                const _databaseObject = new Database(_db, __dbName)
                /**
                 * Resolving the object 
                 */
                resolve(_databaseObject)
            })
            /**
             * If any error occurs we'll catch it 
             */
            .catch(reject)
        })
    }
    async UpdateUser(_id: Snowflake, _update: any): Promise<void> {
        return new Promise ((resolve: () => void, reject: (err: any) => void) => {
            if(!_id){
                reject("Provide a valid user id");
            }
            if(!_update){
                reject("Provide what to edit / change")
            }
            this.db.collection("Users").updateOne({
                id: _id
            }, {
                $set: _update
            }).then((): void => {
                resolve()
            }).catch(reject)
        })
    }
    async GetUserByID(_id: Snowflake): Promise<User | null> {
        return new Promise ((resolve: (_user: User | null) => void, reject: (err: any) => void) => {
            if(!_id){
                reject("Provide a valid User ID");
            }
            this.db.collection("Users").find({
                id: _id
            }, {
                projection: {
                    _id: 0
                }})
            .sort({ id: 1 })
            .limit(1)
            .toArray()
		    .then((res: Array<User>): void => {
		        resolve(res[0])
	        }).catch(reject)
        })
    }
    
    async GetUserByUsername(_uName: string): Promise<User | null> {
        return new Promise ((resolve: (_user: User | null) => void, reject: (err: any) => void) => {
            if(!_uName){
                reject("Provide a valid Username");
            }
            this.db.collection("Users").find({
                username: _uName
            }, {
                projection: {
                    _id: 0
		    }})
            .sort({ username: 1 })
            .limit(1)
            .toArray()
		    .then((res: Array<User>): void => {
		        resolve(res[0])
	        }).catch(reject)
        })
    }
    async GetUserByEmail(_email: string): Promise<User | null> {
        return new Promise ((resolve: (_user: User | null) => void, reject: (err: any) => void) => {
            if(!_email){
                reject("Provide a valid Email");
            }
            this.db.collection("Users").find({
                email: _email
            }, {
                projection: {
                    _id: 0
		    }})
            .sort({ email: 1 })
            .limit(1)
            .toArray()
		    .then((res: Array<User>): void => {
		        resolve(res[0])
	        }).catch(reject)
        })
    }
    async CreateNewUser(_userData: User): Promise<User> {
        return new Promise ((resolve: (_inv: User) => void, reject: (err: any) => void) => {
            if(!_userData){
                reject("Provide a valid user data");
            }
            if(!_userData.id){
                reject("Provide a valid user ID")
            }
            this.db.collection("Users").insertOne(_userData).then((): void => {
		        resolve(_userData)
	        }).catch(reject)
        })
    }
    async GetUserByToken(_token: string): Promise<Snowflake | null> {
        return new Promise ((resolve: (_user: Snowflake | null) => void, reject: (err: any) => void) => {
            if(!_token){
                reject("Provide a valid token");
            }
            this.db.collection("Tokens").find({
                token: _token
            }, {
                projection: {
                    _id: 0
		    }})
            .sort({ token: 1 })
            .limit(1)
            .toArray()
		    .then((res: Array<Tokens>): void => {
		        if(!res[0]){
		            resolve(null)
		        } else {
		            resolve(res[0].user)
		        }
	        }).catch(reject)
        })
    }
    async CreateNewToken(_uID: Snowflake, _token: string, _expires?: TimeInteger): Promise<Tokens> {
        return new Promise ((resolve: (_inv: Tokens) => void, reject: (err: any) => void) => {
            if(!_uID){
                reject("Provide a valid user ID");
            }
            if(!_token){
                reject("Provide a valid token")
            }
            let _exp;
            if(!_expires){
                let __d = Date.now()
                /**
                 * By default it expires in a week 
                 */
                __d += 7*24*60*60*1000
                _exp = __d
            } else {
                _exp = _expires
            }
            const token: Tokens = {
                token: _token,
                user: _uID,
                expires: _exp
            }
            this.db.collection("Tokens").insertOne(token).then((): void => {
		        resolve(token)
	        }).catch(reject)
        })
    }
    async GetInvoiceByUser(_uID: Snowflake, _limit?: number): Promise<Invoice[] | any[]> {
        return new Promise ((resolve: (_inv: Invoice[] | any[]) => void, reject: (err: any) => void) => {
            if(!_uID){
                reject("Provide a valid user ID");
            }
            let lim;
            if(!_limit){
                lim = 20
            } else {
                lim = _limit
            }
            this.db.collection("Invoice").find({
                user: _uID
            }, {
                projection: {
                    _id: 0
		    }})
            .sort({ id: 1 })
            .limit(lim)
            .toArray()
		    .then((res: Array<Invoice>): void => {
		        resolve(res)
	        }).catch(reject)
        })
    }
    async GetInvoiceByID(_id: string): Promise<Invoice | null> {
        return new Promise ((resolve: (_inv: Invoice | null) => void, reject: (err: any) => void) => {
            if(!_id){
                reject("Provide a valid Invoice ID");
            }
            this.db.collection("Invoice").find({
                id: _id
            }, {
                projection: {
                    _id: 0
		    }})
            .sort({ id: 1 })
            .limit(1)
            .toArray()
		    .then((res: Array<Invoice>): void => {
		        resolve(res[0])
	        }).catch(reject)
        })
    }
    async GetIncompleteInvoices(_uID: Snowflake): Promise< Invoice[] | any[] > {
        return new Promise ((resolve: (_inv: Invoice[] | any[]) => void, reject: (err: any) => void) => {
            if(!_uID){
                reject("Provide a valid user ID");
            }
            this.db.collection("Invoice").find({
                user: _uID
            }, {
                projection: {
                    _id: 0
		    }})
            .sort({ id: 1 })
            .toArray()
		    .then((res: Array<Invoice>): void => {
		        resolve(res)
	        }).catch(reject)
        })
    }
    async CreateNewInvoice(_invoice: Invoice): Promise<Invoice> {
        return new Promise ((resolve: (_inv: Invoice) => void, reject: (err: any) => void) => {
            if(!_invoice){
                reject("Provide a valid invoice");
            }
            if(!_invoice.id){
                reject("Provide a valid invoice id")
            }
            this.db.collection("Invoice").insertOne(_invoice).then((): void => {
                resolve(_invoice)
            }).catch(reject)
        })
    }
    async UpdateInvoice(_id: Snowflake, _update: any): Promise<void> {
        return new Promise ((resolve: () => void, reject: (err: any) => void) => {
            if(!_id){
                reject("Provide a valid invoice id");
            }
            if(!_update){
                reject("Provide what to edit / change")
            }
            this.db.collection("Invoice").updateOne({
                id: _id
            }, {
                $set: _update
            }).then((): void => {
                resolve()
            }).catch(reject)
        })
    }
}
