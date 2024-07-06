export class ChatItem {
    source: string;
    text: string;
    time: Date;

    constructor(src: string, text: string){
        this.time = new Date();
        this.source = src;
        this.text = text;
    }
}