import { Message } from "discord.js";

export class Profanityfilter {
    private PATH = './src/utils/profanity/Badwords.txt';
    private JFile;
    private profwords;

    constructor(){
        this.JFile = require('jfile');
        this.profwords = new this.JFile(this.PATH);
    }

    public checkword(message: Message){
            if(this.filter(message)){
                message.reply(" O dat vind otter niet zo leuk om te horen...");
                return true;
            }
            return false;
    }
    
    private filter(message: Message) {
        let messageTrimmed: string = message.content.substring(1);
        let result= this.profwords.grep(messageTrimmed);
        if(result.length != 0){
            console.log(result);
            for (const element of result) {
                console.log(element.trim()+" == "+messageTrimmed);
                if(element.trim() === messageTrimmed){
                    console.log("dat mag je niet zeggen");
                    return true;
                }
            }
        }
        return false;
    }
}