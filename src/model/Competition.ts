export class Competition {
    constructor(
        private id: string,
        private name: string,
        private status: STATUS,
        private unit: string, 
        private wins: WINS
    ){}

    getId () {return this.id}

    getName () {return this.name}

    getStatus () {return this.status}

    getUnit () {return this.unit}

    getWins () {return this.wins}
}

export enum STATUS {
    PROGRESS = 'PROGRESS',
    FINISHED = 'FINISHED'
}

export enum WINS {
    BIGGEST = 'BIGGEST',
    SMALLER = 'SMALLER'
}