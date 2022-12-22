export class Event{
    constructor(
        public _id: string, 
        public name: string, 
        public professor: string,
        public typeEvent: string, 
        public startDate: string, 
        public endDate: string, 
        public duration: number, 
        public participants: number, 
        public aproved: boolean 
    ){}
}