import {Component, OnInit} from '@angular/core';
import {Words} from './helpers/words';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    toggle = false;
    words: Words = new Words();

    switchWin() {
        this.toggle = !this.toggle;
    }

    ngOnInit(): void {
        this.words.assignWords();
        // console.log('verbs-----------------------------------------------------------------------------');
        // console.log(this.words.get1DArray(this.words.getVerbs()));
        // console.log('other-----------------------------------------------------------------------------');
        // console.log(this.words.get1DArray(this.words.getOthers()));
        // console.log('pronouns-----------------------------------------------------------------------------');
        // console.log( this.words.get1DArray(this.words.getPronouns()));
        // console.log('nouns-----------------------------------------------------------------------------');
        // console.log(this.words.get1DArray(this.words.getNouns()));
        // console.log( this.words.calculateAllWords());
    }

}

