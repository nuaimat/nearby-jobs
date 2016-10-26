export class JobPost {
    constructor(
        public id?: number,
        public title?: string,
        public category?: string,
        public description?: string,
        public startingDate?: Date,
        public endingDate?: Date,
        public lat?: number,
        public lng?: number
    ) {  }
}