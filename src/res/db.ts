/**
 * Import types
 */
import { Db } from "mongodb";
import { Invoice, Snowflake, TimeInteger, Tokens, User } from "./../typings";

/**
 * Import modules
 */
import { MongoClient } from "mongodb";

/**
 * This is the database constructor.
 * But unfortunately we can't call it with new Database() because class constructor can't be asynchronous
 * So we have to use Database.connect() method
 * It'll create a new instance of the original class and return it
 */
export class Database {
    /**
     * The name of the database
     */
    private readonly dbName: string;
    /**
     * The database object
     * type is mongodb Database
     */
    private db: Db;

    constructor(_db: Db, _dbName: string) {
        /**
         * Set the values
         */
        this.db = _db;
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
        return new Promise(
            (resolve: (__db: Database) => void, reject: () => void) => {
                /**
                 * Creating a mongodb client
                 */
                const client = new MongoClient(`${_uri}${__dbName}`, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                });
                /**
                 * Connecting to the Database
                 */
                client
                    .connect()
                    .then((_database: Db) => {
                        /**
                         * If connection is successful it'll create a new Database()
                         */
                        const _db = _database.db(__dbName);
                        const _databaseObject = new Database(_db, __dbName);
                        /**
                         * Resolving the object
                         */
                        resolve(_databaseObject);
                    })
                    /**
                     * If any error occurs we'll catch it
                     */
                    .catch(reject);
            }
        );
    }
    /**
     * Used for updating any user's data
     * eg name, email etc
     */
    async UpdateUser(_id: Snowflake, _update: any): Promise<void> {
        /**
         * Return a new promise with a void return type
         */
        return new Promise(
            (resolve: () => void, reject: (err: any) => void) => {
                /**
                 * If there's no id then stop the promise
                 */
                if (!_id) {
                    return reject("Provide a valid user id");
                }
                /**
                 * If no _update then stop the function
                 */
                if (!_update) {
                    return reject("Provide what to edit / change");
                }
                if (_update.id || _update.username) {
                    return reject("Can't change the username or id");
                }
                /**
                 * Updating the user based on query
                 */
                this.db
                    .collection("Users")
                    .updateOne(
                        {
                            /**
                             * querying based on the user id
                             */
                            id: _id,
                        },
                        {
                            /**
                             * Set the changes
                             */
                            $set: _update,
                        }
                    )
                    .then((): void => {
                        /**
                         * after the changes have been done
                         */
                        resolve();
                    })
                    /**
                     * In case any errors occurred
                     */
                    .catch(reject);
            }
        );
    }
    /**
     * Get user with the provided id
     */
    async GetUserByID(_id: Snowflake): Promise<User | null> {
        return new Promise(
            (
                resolve: (_user: User | null) => void,
                reject: (err: any) => void
            ) => {
                /**
                 * If no id provided then stop the execution
                 */
                if (!_id) {
                    return reject("Provide a valid User ID");
                }
                /**
                 * Select collection Users and run the query
                 */
                this.db
                    .collection("Users")
                    .find(
                        {
                            /**
                             * where id is the provided id
                             */
                            id: _id,
                        },
                        {
                            /**
                             * We don't need the _id field
                             */
                            projection: {
                                _id: 0,
                            },
                        }
                    )
                    /**
                     * Sorting based on id
                     */
                    .sort({ id: 1 })
                    /**
                     * We need only one Database
                     */
                    .limit(1)
                    .toArray()
                    /**
                     * It should return an array of Users
                     * resolving the first element of the array
                     */
                    .then((res: Array<User>): void => {
                        resolve(res[0]);
                    })
                    /**
                     * If any error occurred
                     */
                    .catch(reject);
            }
        );
    }
    /**
     * Get user from provided username
     */
    async GetUserByUsername(_uName: string): Promise<User | null> {
        return new Promise(
            (
                resolve: (_user: User | null) => void,
                reject: (err: any) => void
            ) => {
                /**
                 * If no username provided then stop the execution
                 */
                if (!_uName) {
                    return reject("Provide a valid Username");
                }
                /**
                 * Select the collection and run the find query
                 */
                this.db
                    .collection("Users")
                    .find(
                        {
                            /**
                             * If the username is the actual username
                             */
                            username: _uName,
                        },
                        {
                            /**
                             * We don't need the _id thing
                             */
                            projection: {
                                _id: 0,
                            },
                        }
                    )
                    .sort({ username: 1 })
                    /**
                     * We only want one document
                     */
                    .limit(1)
                    /**
                     * Converting to an array
                     */
                    .toArray()
                    /**
                     * It should return an array of Users
                     */
                    .then((res: Array<User>): void => {
                        /**
                         * Resolve the result
                         */
                        resolve(res[0]);
                    })
                    /**
                     * In case any error occurred
                     */
                    .catch(reject);
            }
        );
    }
    /**
     *
     *
     * I can't comment anymore
     * It's too much work
     * I don't have time for this
     * I'm gonna comment it later
     *
     *
     *
     *
     *
     */
    /**
     * Get user with provided email
     */
    async GetUserByEmail(_email: string): Promise<User | null> {
        return new Promise(
            (
                resolve: (_user: User | null) => void,
                reject: (err: any) => void
            ) => {
                if (!_email) {
                    return reject("Provide a valid Email");
                }
                this.db
                    .collection("Users")
                    .find(
                        {
                            email: _email,
                        },
                        {
                            projection: {
                                _id: 0,
                            },
                        }
                    )
                    .sort({ email: 1 })
                    .limit(1)
                    .toArray()
                    .then((res: Array<User>): void => {
                        resolve(res[0]);
                    })
                    .catch(reject);
            }
        );
    }
    /**
     * Get user by username or email 
     * If any one of them matches the criteria return the user 
     */
     async GetUserByUsernameOrEmail(_uName: string, _email): Promise<User | null> {
        return new Promise(
            (
                resolve: (_user: User | null) => void,
                reject: (err: any) => void
            ) => {
                /**
                 * If no username provided then stop the execution
                 */
                if (!_uName) {
                    return reject("Provide a valid Username");
                }
                /**
                 * if no email then stop the execution 
                 */
                 if(!_email){
                     return reject("Provide a valid email")
                 }
                /**
                 * Select the collection and run the find query
                 */
                this.db
                    .collection("Users")
                    .find(
                        {
                            $or: [{
                                username: _uName
                            }, {
                                email: _email
                            }]
                        },
                        {
                            /**
                             * We don't need the _id thing
                             */
                            projection: {
                                _id: 0,
                            },
                        }
                    )
                    .sort({ username: 1 })
                    /**
                     * We only want one document
                     */
                    .limit(1)
                    /**
                     * Converting to an array
                     */
                    .toArray()
                    /**
                     * It should return an array of Users
                     */
                    .then((res: Array<User>): void => {
                        /**
                         * Resolve the result
                         */
                        resolve(res[0]);
                    })
                    /**
                     * In case any error occurred
                     */
                    .catch(reject);
            }
        );
    }
    /**
     * Register new user
     */
    async CreateNewUser(_userData: User): Promise<User> {
        return new Promise(
            (resolve: (_inv: User) => void, reject: (err: any) => void) => {
                if (!_userData) {
                    return reject("Provide a valid user data");
                }
                if (!_userData.id) {
                    return reject("Provide a valid user ID");
                }
                this.db
                    .collection("Users")
                    .insertOne(_userData)
                    .then((): void => {
                        resolve(_userData);
                    })
                    .catch(reject);
            }
        );
    }
    /**
     * Get user id with the provided token
     */
    async GetUserByToken(_token: string): Promise<Snowflake | null> {
        return new Promise(
            (
                resolve: (_user: Snowflake | null) => void,
                reject: (err: any) => void
            ) => {
                if (!_token) {
                    return reject("Provide a valid token");
                }
                this.db
                    .collection("Tokens")
                    .find(
                        {
                            token: _token,
                        },
                        {
                            projection: {
                                _id: 0,
                            },
                        }
                    )
                    .sort({ token: 1 })
                    .limit(1)
                    .toArray()
                    .then((res: Array<Tokens>): void => {
                        if (!res[0]) {
                            resolve(null);
                        } else {
                            resolve(res[0].user);
                        }
                    })
                    .catch(reject);
            }
        );
    }
    /**
     * Create a new token
     * Basically when someone signs up for the first time
     */
    async CreateNewToken(
        _uID: Snowflake,
        _token: string,
        _expires?: TimeInteger
    ): Promise<Tokens> {
        return new Promise(
            (resolve: (_inv: Tokens) => void, reject: (err: any) => void) => {
                if (!_uID) {
                    return reject("Provide a valid user ID");
                }
                if (!_token) {
                    return reject("Provide a valid token");
                }
                let _exp: TimeInteger;
                /**
                 * if no expiration date provided set it to a week
                 */
                if (!_expires) {
                    /**
                     * Current TimeInteger
                     */
                    let __d = Date.now();
                    /**
                     * By default it expires in a week
                     */
                    __d += 7 * 24 * 60 * 60 * 1000;
                    _exp = __d;
                } else {
                    /**
                     * else set the provided expiration date
                     */
                    _exp = _expires;
                }
                /**
                 * The token object that'll be saved
                 */
                const token: Tokens = {
                    token: _token,
                    user: _uID,
                    expires: _exp,
                };
                /**
                 * Select Tokens collection and save the data
                 */
                this.db
                    .collection("Tokens")
                    .insertOne(token)
                    .then((): void => {
                        resolve(token);
                    })
                    .catch(reject);
            }
        );
    }
    /**
     * Get all invoices of a user
     */
    async GetInvoiceByUser(
        _uID: Snowflake,
        _limit?: number
    ): Promise<Invoice[] | any[]> {
        return new Promise(
            (
                resolve: (_inv: Invoice[] | any[]) => void,
                reject: (err: any) => void
            ) => {
                if (!_uID) {
                    return reject("Provide a valid user ID");
                }
                let lim: number;
                /**
                 * If no limit provided it'll fetch 20 by default
                 */
                if (!_limit) {
                    lim = 20;
                } else {
                    /**
                     * If limit provided it'll fetch the provided limit of data
                     */
                    lim = _limit;
                }
                this.db
                    .collection("Invoice")
                    .find(
                        {
                            user: _uID,
                        },
                        {
                            projection: {
                                _id: 0,
                            },
                        }
                    )
                    .sort({ id: 1 })
                    .limit(lim)
                    .toArray()
                    .then((res: Array<Invoice>): void => {
                        resolve(res);
                    })
                    .catch(reject);
            }
        );
    }
    /**
     * Get a single invoice by provided id
     */
    async GetInvoiceByID(_id: string): Promise<Invoice | null> {
        return new Promise(
            (
                resolve: (_inv: Invoice | null) => void,
                reject: (err: any) => void
            ) => {
                if (!_id) {
                    return reject("Provide a valid Invoice ID");
                }
                this.db
                    .collection("Invoice")
                    .find(
                        {
                            id: _id,
                        },
                        {
                            projection: {
                                _id: 0,
                            },
                        }
                    )
                    .sort({ id: 1 })
                    .limit(1)
                    .toArray()
                    .then((res: Array<Invoice>): void => {
                        resolve(res[0]);
                    })
                    .catch(reject);
            }
        );
    }
    /**
     * Get all invoices that are not completed
     */
    async GetIncompleteInvoices(_uID: Snowflake): Promise<Invoice[] | any[]> {
        return new Promise(
            (
                resolve: (_inv: Invoice[] | any[]) => void,
                reject: (err: any) => void
            ) => {
                if (!_uID) {
                    return reject("Provide a valid user ID");
                }
                this.db
                    .collection("Invoice")
                    .find(
                        {
                            user: _uID,
                        },
                        {
                            projection: {
                                _id: 0,
                            },
                        }
                    )
                    .sort({ id: 1 })
                    .toArray()
                    .then((res: Array<Invoice>): void => {
                        resolve(res);
                    })
                    .catch(reject);
            }
        );
    }
    /**
     * Create a new invoice
     */
    async CreateNewInvoice(_invoice: Invoice): Promise<Invoice> {
        return new Promise(
            (resolve: (_inv: Invoice) => void, reject: (err: any) => void) => {
                if (!_invoice) {
                    return reject("Provide a valid invoice");
                }
                if (!_invoice.id) {
                    return reject("Provide a valid invoice id");
                }
                this.db
                    .collection("Invoice")
                    .insertOne(_invoice)
                    .then((): void => {
                        resolve(_invoice);
                    })
                    .catch(reject);
            }
        );
    }
    /**
     * Update an invoice data
     */
    async UpdateInvoice(_id: Snowflake, _update: any): Promise<void> {
        return new Promise(
            (resolve: () => void, reject: (err: any) => void) => {
                if (!_id) {
                    return reject("Provide a valid invoice id");
                }
                if (!_update) {
                    return reject("Provide what to edit / change");
                }
                /**
                 * Don't change the id 
                 */
                if(_update.id){
                    return reject("Can't change the id");
                }
                this.db
                    .collection("Invoice")
                    .updateOne(
                        {
                            id: _id,
                        },
                        {
                            $set: _update,
                        }
                    )
                    .then((): void => {
                        resolve();
                    })
                    .catch(reject);
            }
        );
    }
}
