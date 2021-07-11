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
    private readonly _dbName: string;
    private readonly _db: Db;
    constructor(__db: Db, __dbName: string){
        this._db = __db
        this._dbName = __dbName;
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
                const _databaseObject = new Database(_database, __dbName)
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
    static async GetUserByID(_uID: Snowflake): Promise<User | null> {
        //
    }
    static async GetUserByUsername(_uName: string): Promise<User | null> {
        //
    }
    static async GetUserByEmail(_email: string): Promise<User | null> {
        //
    }
    static async CreateNewUser(_userData: User): Promise<User> {
        //
    }
    static async GetUserByToken(_token: string): Promise<Snowflake | null> {
        //
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