import app from "./app";
import AthleteController from "./controller/AthleteController";
import CompetitionController from "./controller/CompetitonController";

const competitionController = new CompetitionController()
const athleteController = new AthleteController()

app.post('/competition', competitionController.create)
app.post('/athlete', athleteController.create)
app.post('/result', competitionController.createResult)

app.get('/ranking/:id', competitionController.getRanking)

app.put('/competition', competitionController.finishCompetition)