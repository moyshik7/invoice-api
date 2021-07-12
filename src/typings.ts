/**
 * Time integer is the time from January 1st 1970 
 * Calculated in ms 
 * Can be received from Date().now() 
 */
export type TimeInteger = number
/**
 * IDs 
 * Integer in string format 
 * @example '10000000000000000001' 
 */
export type Snowflake = string
/**
 * Encrypted version of orginal password or string 
 */
export type Hash = string
/**
 * Default interface of an invoice 
 */
export interface Invoice {
  /**
   * ID of the invoice
   */
  id: Snowflake;
  /**
   * Title of the invoice 
   * Should be around 250 characters 
   */
  title: string;
  /**
   * Detailed description of the invoice
   */
  description: string;
  /**
   * User ID of the person the Invoice is assigned to / who'll pay 
   * This person will receive the alert
   */
  user: Snowflake;
  /**
   * Who to pay for the invoice
   */
  payTo: string;
  /**
   * Deadline for the payment
   */
  due: TimeInteger;
  /**
   * Total payment for this invoice
   */
  total: number;
  /**
   * Current stats of the payment 
   */
  stats: {
    /**
     * If the total payment is completed 
     */
    completed: boolean;
    /**
     * If the payment is completed then the time
     */
    completedOn ?: TimeInteger;
  }
  /**
   * Which group the invoice belongs to
   * array of group IDs
   */
  group ?: Array<Snowflake>;
}
/**
 * Default user 
 * Password is protected by hashing and salting 
 * UserID is a combination of Joined Time Integer and username 
 */
export interface User {
  /**
   * User's unique id (randomly generated) 
   * unique
   */
  id: Snowflake;
  /**
   * username of user 
   * unique
   */
  username: string;
  /**
   * The email of the user 
   * unique 
   */
  email: string;
  /**
   * Actual name of user
   */
  name: string;
  /**
   * Roles of the user
   * array of role IDs
   */
  roles?: Array<Snowflake>;
  /**
   * When the user joined
   */
  joined: TimeInteger;
  /**
   * If the user is an admin
   * Only admins can create and edit invoices
   */
  admin: boolean;
  /**
   * md5 encrypted + salted password hash
   */
  password: Hash;
}
/**
 * Default interface for storing tokens 
 * Tokens are mix of md5 hash and base64 encoded random texts saved in user' browser 
 */
export interface Tokens {
  /**
   * The actual token 
   * unique
   */
  token: string;
  /**
   * Which user this token applies to 
   */
  user: Snowflake;
  /**
   * How long is the token valid 
   * ms from 1970
   */
  expires: TimeInteger;
}
/**
 * Default role interface 
 * Roles can be assigned to users 
 * Not useful now but might come handy later 
 */
export interface Role {
  /**
   * ID of the role
   */
  id: Snowflake;
  /**
   * Name of the role 
   */
  name: string;
  /**
   * Array of permission Integers
   */
  permissions: Array<number>;
}
