import connection from "./connection"

const printError = (error: any) => { console.log(error.sqlMessage || error.message) }

const createTables = () => connection.raw(`
CREATE TABLE estante_competition (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    status ENUM ('PROGRESS', 'FINISHED') DEFAULT 'PROGRESS',
    unit VARCHAR(255) NOT NULL,
    wins ENUM ('BIGGEST', 'SMALLER') NOT NULL
    );
    
    CREATE TABLE estante_athlete (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL
    );
    
    CREATE TABLE estante_results (
    id VARCHAR (255) PRIMARY KEY,
    athlete_id VARCHAR(255) NOT NULL,
    competition_id VARCHAR(255) NOT NULL,
    result float NOT NULL,
    FOREIGN KEY (athlete_id) REFERENCES estante_athlete(id),
    FOREIGN KEY (competition_id) REFERENCES estante_competition(id)
    );
`)
    .then(() => { console.log("Tabelas criadas") })
    .catch(printError)

createTables() 