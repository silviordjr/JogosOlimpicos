import { Athlete } from "../model/Athlete";
import connection from "./connection";

export default class AthelteDatabase {
    async create (athlete: Athlete): Promise <void> {
        await connection ('estante_athlete')
            .insert ({
                id: athlete.getId(),
                name: athlete.getName()
            })
    }
}