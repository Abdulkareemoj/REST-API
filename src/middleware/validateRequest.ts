import {AnySchema} from 'yup'
import { Request, Response, NextFunction} from 'express'
import log from '../logger'

const validate = (schema: AnySchema) => async(
     req:Request, res:Response, next:NextFunction
)=>{
    try{
        await schema.validate({
            body: req.body,
            query: req.query,
            params: req.params
        })

        return next()
    }catch(e){
        return log.error(e) res.status(400).send(e.error)
    }
}