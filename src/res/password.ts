import { Snowflake } from './../typings'
import md5 from 'md5'

export const Password = (user: Snowflake, password: string): string => {
    if(!user || !password){
        return ""
    }
    /**
     * weird but should work for now 
     */
    return md5(`${user}${password}`)
}