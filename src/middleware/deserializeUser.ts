import { get } from "lodash"
import { Request, Response, NextFunction } from "express"
import { decode } from "../utils/jwt.utils"
import { reIssueAccessToken } from "../service/session.service"

const deserializeUser = async(
    req: Request, 
    res: Response, 
    next:NextFunction 
)=>{
    const accessToken = get(req, "headers.authorization", "").replace(/^Bearer\s/, "") 

    const refreshToken = get(req, "headers.x-refresh")
    if (!accessToken) return next()
    const{decoded, expired} = decode(accessToken)

    if (decoded){
        req.user = decoded
        return next()
    }
if (esxpired && refreshToken){
    const newAccessToken = await reIssueAccessToken({refreshToken})
    if (newAccessToken){
        res.setHeader("x-access-token", newAccessToken)
        const {decoded } = decode(newAccessToken)
        req.user = decoded
    }
    return next()
}
return next()
}

export default deserializeUser