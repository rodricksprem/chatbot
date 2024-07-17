export class ChatItem {
    source: string;
    text: string;
    time: Date;
    isQueryResponse: boolean;
    
    constructor(src: string, text: string,isQueryResponse:boolean){
        this.time = new Date();
        this.source = src;
        this.text = text;
        this.isQueryResponse=isQueryResponse;

    }
}