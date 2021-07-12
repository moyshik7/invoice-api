import { Snowflake } from './../typings'

import md5 from 'md5'

export const RandomUserID = (username: string): Snowflake => {
    if(!username || !username.length){
        return ""
    } else {
        return md5(username)
    }
}