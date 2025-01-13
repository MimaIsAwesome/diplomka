import {Component, Input, OnInit} from '@angular/core';
import {Assigner} from '../helpers/assigner';
import {Parser} from '../helpers/parser';
import {Words} from '../helpers/words';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css']
})
export class AvatarComponent {
    @Input() toggle;
    @Input() words;
    pause = 'Pauza';
    displayNotification = false;
    expression = '';
    text = '';
    welcome = 'Vítajte, prosím napíšte text na preloženie';
    typing = 'Píšem...';
    translating = 'Prekladám...';
    title = this.welcome;
    idle = '../assets/idle.jpg';
    assigner = new Assigner;
    parser = new Parser;

    link = this.idle;

    getText(text: any) {
        this.text = text.toString();
        if (text !== undefined || text !== '') {
            this.title = this.typing;
        }
        if (text === '') {
            this.title = this.welcome;
        }
    }

    getSub(): String {
        return this.text;
    }

    // time= 1040ms

    PlayGif = async () => {
        const delay = ms => new Promise(res => setTimeout(res, ms));

        const textToParse = this.getSub();
        this.title = this.translating;

        const parsedTxt = this.parser.parse(textToParse, this.words);

        for (let i = 0; i < parsedTxt.length; i++) {
            this.expression = parsedTxt[i].toLowerCase();

            // decide if notification should be displayed or not
            if (!this.expression.match(/^ *$/)) {
                this.displayNotification = true;
            } else {
                this.expression = this.pause;
            }

            if ( parsedTxt[i].toLowerCase().match(/^ *$/)) {
                this.link = '../assets/idle.jpg';
                await delay(300);
                continue;
            }

            const type = this.getType(this.expression, parsedTxt[i]);
            if (type === 'alphabet' || type === 'number') {
                this.link = this.assigner.assign(parsedTxt[i].toLowerCase(), type);
                await delay(1040);
            } else {
                this.link = this.assigner.assign(parsedTxt[i].toLowerCase(), type);
                await delay(1550);
            }

            this.expression = '';
            this.displayNotification = false;
        }

        this.title = this.welcome;
        this.link = this.idle;
    }

    // NAMING IS ACORDING TO PACKAGE NAMING IN ASSETS
    getType(expression: string, parsedTxt: String): string {
        if (this.expression.length === 1 && isNaN(+this.expression)) {
            return 'alphabet';
        }
        if (this.expression.length === 1 && !isNaN(+this.expression)) {
            return 'numbers';
        }
        if (this.words.isPronoun(parsedTxt.toLowerCase())) {
            return 'pronouns';
        }
        if (this.words.isVerb(parsedTxt.toLowerCase())) {
            return 'verbs';
        }
        if (this.words.isNoun(parsedTxt.toLowerCase())) {
            return 'nouns';
        }
        if (this.words.isOther(parsedTxt.toLowerCase())) {
            return 'other';
        }


        return '';
    }

}
