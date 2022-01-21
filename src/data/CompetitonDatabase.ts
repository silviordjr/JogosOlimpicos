import { Competition, STATUS } from "../model/Competition";
import { Ranking } from "../model/Ranking";
import connection from "./connection";

export default class CompetitionDatabase {
    async create (competition: Competition): Promise <void> {
        await connection ('estante_competition')
            .insert({
                id: competition.getId(),
                name: competition.getName(),
                unit: competition.getUnit(),
                wins: competition.getWins()
            })
    }

    async createResult (athelteId: string, competitionId: string, result: string, id: string): Promise <void> {
        await connection ('estante_results')
            .insert({
                id: id,
                competition_id: competitionId,
                athlete_id: athelteId,
                result: result
            })
    }

    async getCompetition (competitionId: string): Promise <Competition | undefined> {
        const competition = await connection ('estante_competition')
            .where({id: competitionId})
            .select('*')
        
        if (competition.length > 0){
            const newCompetition = new Competition(competition[0].id, competition[0].name, competition[0].status, competition[0].unit, competition[0].wins)

            return newCompetition
        } else {
            return undefined
        }
    }

    async finishCompetition (competitionId: string): Promise <void> {
        const finished = STATUS.FINISHED

        await connection ('estante_competition')
            .where({id: competitionId})
            .update({status: finished})
    }

    async getRanking (competitionId: string, order: string): Promise < Ranking [] > {
        const rank = await connection ('estante_results')
            .where({competition_id: competitionId})
            .join('estante_athlete', 'estante_results.athlete_id', '=', 'estante_athlete.id')
            .join('estante_competition', 'estante_results.competition_id', '=', 'estante_competition.id')
            .select('estante_athlete.name as name', 'estante_athlete.id as id', 'estante_competition.unit as unit', 'estante_results.result as result')
            .orderBy('estante_results.result', order)
        
        let ranking: Ranking [] = []

        for (let res of rank){
            const newResult = new Ranking(res.id, res.name, res.result, res.unit)

            ranking.push(newResult)
        }

        return ranking
    }
}