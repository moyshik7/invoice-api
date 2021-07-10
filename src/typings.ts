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
  assignedTo: Snowflake;
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
     * How much have been paid 
     * @default 0
     */
    paid: number;
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
