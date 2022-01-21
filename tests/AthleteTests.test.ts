import AthleteBusiness from "../src/business/AthleteBusiness"
import populateAthleteMock from "./mocks/populateAthleteMock"

describe ('Athlete Tests', () => {
    const createAthlete = new AthleteBusiness().create

    test ('Create Athlete -- sucess', async () => {
        try {
            await createAthlete('João', populateAthleteMock)

            expect(populateAthleteMock).toBeCalledTimes(1)
        } catch (error: any) {
            console.log(error.message)
        } finally {
            expect.assertions(1)
        }
    })

    test('Create Athlete -- no name', async () => {
        try {
            await createAthlete('', populateAthleteMock)
        } catch (error: any) {
            expect(error.message).toBe('Preencha o campo obrigatório (name).')
        } finally {
            expect.assertions(1)
        }
    })
})