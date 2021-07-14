import { Snowflake } from './../typings'

import md5 from 'md5'

export const RandomUserID = (username: string): Snowflake => {
    if(!username || !username.length){
        return ""
    } else {
        return md5(username)
    }
}
export const RandomAuthToken = (_uname: string, _uid: Snowflake): string => {
    return `${md5(_uid)}.${md5(Date.now())}${md5(_uname)}`
}
export const RandomInvoiceID = (username: string): Snowflake => {
    if(!username || !username.length){
        return ""
    } else {
        return md5(username)
    }
}