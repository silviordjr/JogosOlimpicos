import CompetitionBusiness from "../src/business/CompetitonBusiness"
import getCompetitionMockFalse from "./mocks/getCompetitionMockFalse"
import getCompetitionMockTrue from "./mocks/getCompetitionMockTrue"
import populateCompetitionMock from "./mocks/populateCompetitionMock"
import populateResultMock from "./mocks/populateResultMock"
import getCompetitionMockFinished from "./mocks/getCompetitionMockFinished"
import endCompetitionMock from "./mocks/endCompetitionMock"
import getResultsMock from "./mocks/getResultsMock"

describe ('Competition tests', () => {
    const create = new CompetitionBusiness().create
    const createResult = new CompetitionBusiness().createResult
    const finishCompetition = new CompetitionBusiness().finishCompetition
    const getRanking = new CompetitionBusiness().getRanking

    test('Create Competition -- sucess', async() => {
        try {
            expect(await create("100 metros rasos", "s", 'SMALLER', populateCompetitionMock)).not.toBe('Preencha os campos necessários (name, unit e wins).')
            expect(await create("100 metros rasos", "s", 'SMALLER', populateCompetitionMock)).not.toBe("Tipo de vencedor inválido. O campo wins deve ser 'SMALLER' para casos em que a menor marca vença ou 'BIGGEST' para casos em que o vencedor realize a maior marca.")
            expect(populateCompetitionMock).toBeCalledTimes(2)
        } catch (error: any) {
            console.log(error.message || error.sqlmessage)
        } finally {
            expect.assertions(3)
        }
    })

    test('Create Competition -- empty', async () => {
        try {
            await create("", "", "", populateCompetitionMock)
        } catch (error: any) {
            expect(error.message).toBe('Preencha os campos necessários (name, unit e wins).')
        } finally {
            expect.assertions(1)
        }
    })

    test('Create Competition -- invalid wins', async () => {
        try {
            await create("100 metros rasos", "s", 'menor', populateCompetitionMock)
        } catch (error: any) {
            expect(error.message).toBe("Tipo de vencedor inválido. O campo wins deve ser 'SMALLER' para casos em que a menor marca vença ou 'BIGGEST' para casos em que o vencedor realize a maior marca.")
        } finally{
            expect.assertions(1)
        }
    })

    test('Create Result -- sucess', async () => {
        try {
            await createResult('abcdef', '123456', '10', populateResultMock, getCompetitionMockTrue)

            expect(populateResultMock).toBeCalledTimes(1)
        } catch (error: any) {
            console.log(error.message || error.sqlmessage)
        } finally {
            expect.assertions(1)
        }
    })

    test('Create Result -- competition no found', async () => {
        try {
            await createResult('abcdef', '123456', '10', populateResultMock, getCompetitionMockFalse)
        } catch (error: any) {
            expect(error.message).toBe('Competição inexistente.')
        } finally {
            expect.assertions(1)
        }
    })

    test ('Create Result -- competition finished', async () => {
        try {
            await createResult('abcdef', '123456', '10', populateResultMock, getCompetitionMockFinished)
        } catch (error: any) {
            expect(error.message).toBe('Essa competição ja está encerrada e não aceita mais resultados.')
        } finally {
            expect.assertions(1)
        }
    })

    test('Finish Competition -- sucess', async () => {
        try {
            await finishCompetition('123456', endCompetitionMock)

            expect(endCompetitionMock).toBeCalledTimes(1)
        } catch (error: any) {
            console.log(error.message)
        } finally {
            expect.assertions(1)
        }
    })

    test('Finish Competition -- no ID', async () => {
        try {
            await finishCompetition('', endCompetitionMock)
        } catch (error: any) {
            expect(error.message).toBe('Informe o campo obrigatório (competitionId).')
        } finally {
            expect.assertions(1)
        }
    })

    test ('Get Ranking -- sucess', async () => {
        try {
            await getRanking('123456', getCompetitionMockTrue, getResultsMock)

            expect(getResultsMock).toBeCalledTimes(1)
        } catch (error: any) {
            console.log(error.message)
        } finally {
            expect.assertions(1)
        }
    })

    test ('Get Ranking -- no ID', async () => {
        try {
            await getRanking('', getCompetitionMockTrue, getResultsMock)
        } catch (error: any) {
            expect(error.message).toBe('Informe a ID da competiçao.')
        } finally {
            expect.assertions(1)
        }
    })

    test('Get Ranking -- competition not found', async () => {
        try {
            await getRanking('123456', getCompetitionMockFalse, getResultsMock)
        } catch (error: any) {
            expect(error.message).toBe('Competição inexistente.')
        } finally {
            expect.assertions(1)
        }
    })
})