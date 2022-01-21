export class Ranking {
    constructor(
        private id: string,
        private name: string,
        private result: string,
        private unit: string
    ){}

    getId () {return this.id}

    getName () {return this.name}

    getResult () {return this.result}

    getUnit () {return this.unit}
}