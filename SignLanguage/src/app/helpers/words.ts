import {PatternsManager} from './patterns/patterns-manager';

export class Words {
    // expressionArray: string[] = ['ahoj', 'ano', 'nie'];
    allWords: string[] = [];
    verbsArray: string[][];
    nounsArray: string[][];
    pronounsArray: string[][];
    othersArray: string[][];
    wordsToIgnor: string[] = ['si', 'sa', 'som', 'sme', 'je', 'su', 'ste'];

    getAllWordsToIgnore(): string[] {
        return this.wordsToIgnor;
    }

    getNouns(): string[][] {
        return this.nounsArray;
    }

    getVerbs(): string[][] {
        return this.verbsArray;
    }

    getPronouns(): string[][] {
        return this.pronounsArray;
    }

    getOthers(): string[][] {
        return this.othersArray;
    }

    public assignWords() {
        this.verbsArray = this.assignFromTxt('words/verbs.txt');
        this.pronounsArray = this.assignFromTxt('words/pronouns.txt');
        this.othersArray = this.assignFromTxt('words/other.txt');
        this.nounsArray = this.assignNounsFromTxt();
    }


    assignFromTxt(path: string): string[][] {
        let ArrayFinal: string[][] = [];
        const rawFile = new XMLHttpRequest();
        rawFile.open('GET', path, false);
        rawFile.onreadystatechange = function () {
            if (rawFile.readyState === 4) {
                if (rawFile.status === 200 || rawFile.status === 0) {
                    const allText = rawFile.responseText;

                    let wordNumber = 0;
                    let subdividedWordNumber = 0;
                    let word = '';
                    const wordArray: string[][] = [];
                    wordArray[0] = [];

                    for (let i = 0; i < allText.length; i++) {
                        if (allText.charAt(i) === '\n') {
                            continue;
                        }
                        if (allText.charAt(i) === '*') {
                            i++;
                            do {
                                i++;
                            } while (allText.charAt(i) !== '*');
                            i++;
                        }
                        if (allText.charAt(i) === ',') {
                            wordNumber++;
                            i++;
                            wordArray[wordNumber] = [];
                            subdividedWordNumber = 0;
                            continue;
                        }
                        if (allText.charAt(i) !== ' ') {
                            word = word + allText.charAt(i);
                        } else {
                            wordArray[wordNumber][subdividedWordNumber] = word;
                            word = '';
                            subdividedWordNumber++;
                        }
                    }

                    ArrayFinal = wordArray;

                }
            }
        };
        rawFile.send(null);
        return ArrayFinal;
    }

    assignNounsFromTxt(): string[][] {
        let finalNounsArray: string[][] = [];
        const rawFile = new XMLHttpRequest();
        rawFile.open('GET', 'words/nouns.txt', false);
        rawFile.onreadystatechange = function () {
            if (rawFile.readyState === 4) {
                if (rawFile.status === 200 || rawFile.status === 0) {
                    const allText = rawFile.responseText;

                    const patterns: PatternsManager = new PatternsManager();
                    let row = '';
                    let index = 0;
                    const nounsArray: string[][] = [];

                    for (let i = 0; i < allText.length; i++) {
                        if (allText.charAt(i) === '\n') {
                            continue;
                        }
                        if (allText.charAt(i) === '*') {
                            i++;
                            do {
                                i++;
                            } while (allText.charAt(i) !== '*');
                            i++;
                        }
                        if (allText.charAt(i) !== ',') {
                            row = row + allText.charAt(i);
                        } else {
                            nounsArray[index] = [];
                            nounsArray[index] = patterns.makeInflection(row);
                            index++;
                            row = '';
                        }
                    }
                    finalNounsArray = nounsArray;
                }
            }
        };
        rawFile.send(null);
        this.nounsArray = finalNounsArray;
        return this.nounsArray;
    }

    public isVerb(word: string): boolean {
        for (let i = 0; i < this.verbsArray.length; i++) {
            for (let j = 0; j < this.verbsArray[i].length; j++) {
                if (this.verbsArray[i][j] === word) {
                    return true;
                }
            }
        }
        return false;
    }

    public isNoun(word: string): boolean {
        for (let i = 0; i < this.nounsArray.length; i++) {
            for (let j = 0; j < this.nounsArray[i].length; j++) {
                if (this.nounsArray[i][j] === word) {
                    return true;
                }
            }
        }
        return false;
    }

    public isPronoun(word: string): boolean {
        for (let i = 0; i < this.pronounsArray.length; i++) {
            for (let j = 0; j < this.pronounsArray[i].length; j++) {
                if (this.pronounsArray[i][j] === word) {
                    return true;
                }
            }
        }
        return false;
    }

    public isOther(word: string): boolean {
        for (let i = 0; i < this.othersArray.length; i++) {
            for (let j = 0; j < this.othersArray[i].length; j++) {
                if (this.othersArray[i][j] === word) {
                    return true;
                }
            }
        }
        return false;
    }

    public isIgnoreWord(word: string): boolean {
        for (let i = 0; i < this.wordsToIgnor.length; i++) {
            if (this.wordsToIgnor[i] === word) {
                return true;
            }
        }
        return false;
    }



    public returnIndexNoun(word: string): number {
        for (let i = 0; i < this.nounsArray.length; i++) {
            for (let j = 0; j < this.nounsArray[i].length; j++) {
                if (this.nounsArray[i][j] === word) {
                    return i;
                }
            }
        }
        return -1;
    }

    public isWords(word: string): boolean {
        for (let i = 0; i < this.allWords.length; i++) {
            if (this.allWords[i] === word) {
                return true;
            }
        }
        return false;
    }

    public calculateAllWords(): string[] {
        let index = 0;

        for (let i = 0; i < this.verbsArray.length; i++) {
            for (let j = 0; j < this.verbsArray[i].length; j++) {
                this.allWords[index] = this.verbsArray[i][j];
                index++;
            }
        }

        for (let i = 0; i < this.nounsArray.length; i++) {
            for (let j = 0; j < this.nounsArray[i].length; j++) {
                this.allWords[index] = this.nounsArray[i][j];
                index++;
            }
        }

        for (let i = 0; i < this.othersArray.length; i++) {
            for (let j = 0; j < this.othersArray[i].length; j++) {
                this.allWords[index] = this.othersArray[i][j];
                index++;
            }
        }

        return this.allWords;
    }

    public get1DArray(array: string[][]): string[] {
        const string = [];
        let index = 0;
        for (let i = 0; i < array.length; i++) {
            for (let j = 0; j < array[i].length; j++) {
                string[index] = array[i][j];
                index++;
            }
        }
        return string;
    }
}
