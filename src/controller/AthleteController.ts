import { Request, Response } from "express";
import AthleteBusiness from "../business/AthleteBusiness";
import AthelteDatabase from "../data/AthleteDatabse";

export default class AthleteController {
    async create (req: Request, res: Response): Promise <void> {
        try {
            const {name} = req.body
            
            const populateAthlete = new AthelteDatabase().create
            
            await new AthleteBusiness().create(name, populateAthlete)

            res.status(200).send({message: 'Atleta criado.'})
        } catch (error: any) {
            res.status(500).send(error.message || error.sqlmessage)
        }
    }
}