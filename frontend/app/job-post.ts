/**
 * Created by TiTo on 10/25/2016.
 */
export class JobPost {
    constructor(
        public id?: number,
        public title?: string,
        public category?: string,
        public description?: string,
        public startingDate?: Date,
        public endingDate?: Date,
    ) {  }
}