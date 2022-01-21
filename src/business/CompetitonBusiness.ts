import { Competition, STATUS, WINS } from "../model/Competition"
import { Ranking } from "../model/Ranking"
import IdGenerator from "../services/IdGenerator"

export default class CompetitionBusiness{
    async create (
        name: string, 
        unit: string, 
        wins: string,
        populateCompetition: (competition: Competition) => Promise <void>): Promise <void> {
        if (!name || !unit || !wins){
            throw new Error ('Preencha os campos necessários (name, unit e wins).')
        }

        let competitionWins: WINS
        if (wins === 'BIGGEST'){
            competitionWins = WINS.BIGGEST
        } else if (wins === 'SMALLER'){
            competitionWins = WINS.SMALLER
        } else {
            throw new Error ("Tipo de vencedor inválido. O campo wins deve ser 'SMALLER' para casos em que a menor marca vença ou 'BIGGEST' para casos em que o vencedor realize a maior marca.")
        }

        const status = STATUS.PROGRESS

        const id = new IdGenerator().generateId()

        const newCompetition = new Competition(id, name, status, unit, competitionWins)

        await populateCompetition(newCompetition)
    }

    async createResult (
        athelteId: string, 
        competitionId: string, 
        result: string,
        populateResult: (athelteId: string, competitionId: string, result: string, id: string) => Promise <void>,
        getCompetition: (competitionId: string) => Promise <Competition | undefined>): Promise<void> {
        if (!athelteId || !competitionId || !result){
            throw new Error ('Preencha todos os campos obrigatórios (athleteId, competitionId e result).')
        }

        const competition = await getCompetition(competitionId)

        if (!competition){
            throw new Error ('Competição inexistente.')
        }

        if (competition.getStatus() === STATUS.FINISHED){
            throw new Error ('Essa competição ja está encerrada e não aceita mais resultados.')
        }

        const id = new IdGenerator().generateId()

        await populateResult(athelteId, competitionId, result, id)
    }

    async finishCompetition (
        competitionId: string,
        endCompetition: (competitionId: string) => Promise <void>): Promise<void> {
        if (!competitionId){
            throw new Error ('Informe o campo obrigatório (competitionId).')
        }

        await endCompetition(competitionId)
    }

    async getRanking (
        competitionId: string,
        getCompetition: (competitionId: string) => Promise <Competition | undefined>,
        getResults: (competitionId: string, order: string) => Promise < Ranking [] >): Promise < Ranking [] > {
        if (!competitionId){
            throw new Error ('Informe a ID da competiçao.')
        }

        const competition = await getCompetition(competitionId)
        let order: string

        if (!competition){
            throw new Error ('Competição inexistente.')
        }

        if (competition.getWins() === WINS.SMALLER){
            order = 'ASC'
        } else if (competition.getWins() === WINS.BIGGEST){
            order = "DESC"
        } else {
            throw new Error ('Order inválida. Verifique o banco.')
        }


        const ranking = await getResults(competitionId, order)

        const rankingIds: string [] = []
        const filterRanking = ranking.filter((result) => {
            let bestMark = false

            if (rankingIds.indexOf(result.getId()) === -1){
                rankingIds.push(result.getId())

                bestMark = true
            }

            if (bestMark){
                return result
            }
        })

        return filterRanking

    }
}