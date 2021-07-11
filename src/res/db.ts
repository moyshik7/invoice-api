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
            .toArray()
		    .then((res: Array<User>): void => {
		        resolve(res[0])
	        }).catch(reject)
        })
    }
    
    static async GetUserByUsername(_uName: string): Promise<User | null> {
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
            .toArray()
		    .then((res: Array<User>): void => {
		        resolve(res[0])
	        }).catch(reject)
        })
    }
    static async GetUserByEmail(_email: string): Promise<User | null> {
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
            .toArray()
		    .then((res: Array<User>): void => {
		        resolve(res[0])
	        }).catch(reject)
        })
    }
    static async CreateNewUser(_userData: User): Promise<User> {
        //
    }
    static async GetUserByToken(_token: string): Promise<Snowflake | null> {
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
    static async CreateNewToken(_uID: Snowflake, _token: string, _expires?: TimeInteger): Promise<Tokens> {
        //
    }
    static async GetInvoiceByUser(_uID: Snowflake): Promise<Invoice[] | any[]> {
        //
    }
    static async GetInvoiceByID(_id: string): Promise<Invoice | null> {
        //
    }
    static async GetIncompleteInvoices(_uID): Promise< Invoice[] | any[] > {
        //
    }
    static async CreateNewInvoice(_invoice: Invoice): Promise<Invoice> {
        //
    }
    static async UpdateInvoice(_id: Snowflake, _update: any): Promise<void> {
        //
    }
}
