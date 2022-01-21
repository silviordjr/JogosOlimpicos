import { Request, Response } from "express";
import CompetitionBusiness from "../business/CompetitonBusiness";
import CompetitionDatabase from "../data/CompetitonDatabase";

export default class CompetitionController {
    async create (req: Request, res: Response): Promise <void> {
        try {
            const {name, unit, wins} = req.body

            const populateCompetition = new CompetitionDatabase().create
            
            await new CompetitionBusiness().create(name, unit, wins, populateCompetition)

            res.status(200).send({message: 'Competição criada.'})
        } catch (error: any) {
            res.status(500).send(error.message || error.sqlmessage)
        }
    }

    async createResult (req: Request, res: Response): Promise<void> {
        try {
            const {athleteId, competitionId, result} = req.body

            const populateResult = new CompetitionDatabase().createResult
            const getCompetition = new CompetitionDatabase().getCompetition
            
            await new CompetitionBusiness().createResult(athleteId, competitionId, result, populateResult, getCompetition)

            res.status(200).send({message: 'Resultados cadastrados.'})
        } catch (error: any) {
            res.status(500).send(error.message || error.sqlmessage)
        }
    }
    
    async finishCompetition (req: Request, res: Response): Promise <void> {
        try {
            const {competitionId} = req.body

            const endCompetition = new CompetitionDatabase().finishCompetition
            
            await new CompetitionBusiness().finishCompetition(competitionId, endCompetition)

            res.status(200).send({message: 'Competição encerrada.'})
        } catch (error: any) {
            res.status(500).send(error.message || error.sqlmessage)
        }
    }
    
    async getRanking (req: Request, res: Response): Promise <void> {
        try {
            const competitionId = req.params.id

            const getCompetition = new CompetitionDatabase().getCompetition
            const getResults = new CompetitionDatabase().getRanking

            const ranking = await new CompetitionBusiness().getRanking(competitionId, getCompetition, getResults)
            const competition = await new CompetitionDatabase().getCompetition(competitionId)

            res.status(200).send({status: competition?.getStatus(), ranking: ranking})
        } catch (error: any) {
            res.status(500).send(error.message || error.sqlmessage)
        }
    }
}