import { Ranking } from "../../src/model/Ranking"

export default jest.fn (
    async function getResultsMock (competitionId: string, order: string): Promise < Ranking [] > {
        const result1 = new Ranking('1234335', 'José Mock', '10', 's')
        const result2 = new Ranking('mjvsfgfd', 'João Mock', '12', 's')

        const rank = [result1, result2]

        return rank
    }
)