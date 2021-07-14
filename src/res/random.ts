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
export const RandomInvoiceID = (_user: Snowflake, _invName: string): Snowflake => {
    if(!_user || !_user.length || !_invName || !_invName.length){
        return ""
    } else {
        return md5(`${_user}${Date.now()}${_invName}`)
    }
}