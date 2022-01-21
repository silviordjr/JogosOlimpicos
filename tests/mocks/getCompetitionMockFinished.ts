import { Competition, STATUS, WINS } from "../../src/model/Competition"

export default jest.fn(
    async function getCompetitionMockFinished (competitionId: string): Promise <Competition | undefined> {
        const competition = new Competition('123456', 'competition mock', STATUS.FINISHED, 's', WINS.BIGGEST)

        return competition
    }
)