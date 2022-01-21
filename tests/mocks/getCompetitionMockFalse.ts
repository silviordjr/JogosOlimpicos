import { Competition } from "../../src/model/Competition"

export default jest.fn(
    async function getCompetitionMockFalse (competitionId: string): Promise <Competition | undefined> {
        return undefined
    }
)