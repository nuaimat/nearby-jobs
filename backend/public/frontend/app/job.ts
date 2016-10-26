/**
 * Created by nuaimat on 10/18/16.
 */

export class Job {
    constructor(
        public id: number,
        public title: string,
        public employer: string,
        public location: Array<number>,
        public active: boolean,
        public created: Date,
        public updated: Date,
        public applicants: Array<String>,
        public assigned_to: string,
        public category: string,
        public start_time: Date
    ) {  }
}
