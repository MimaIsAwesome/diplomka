import {Words} from './words';


export class Parser {

    public parse(textRaw: String, words: Words): String[] {
        const wordArray: String[] = [];
        let word = '';
        let lastIndex = 0;

        // console.log('Surový vstup od používateľa:');
        // console.log('%c' + textRaw, 'color: #5B9BD5');
        const text = this.correctDiacritics(textRaw);
        // console.log('Po oprave diakritiky: ');
        // console.log('%c' + text, 'color: #5B9BD5');

        const parsedWords = this.parseIntoWords(text);
        // console.log('Po rozdelení slov: ');
        // console.log(parsedWords);

        for (let i = 0; i < parsedWords.length; i++) {
            if (words.isIgnoreWord(parsedWords[i])) {
                // console.log('%cSlovo: %c' + parsedWords[i] + '%c druh: %cIgnored',
                //     'color: #000000', 'color: #5B9BD5', 'color: #000000', 'color: #C5D30B');
                continue;
            }
            if (words.isPronoun(parsedWords[i])) {
                // console.log('%cSlovo: %c' + parsedWords[i] + '%c druh: %cPronouns',
                // 'color: #000000', 'color: #5B9BD5', 'color: #000000', 'color: #C5D30B');
                wordArray[lastIndex] = this.getGifName(parsedWords[i], words.getPronouns());
                lastIndex++;
                if (i !== parsedWords.length - 1) {
                    wordArray[lastIndex] = ' ';
                    lastIndex++;
                }
                continue;
            }
            if (words.isVerb(parsedWords[i])) {
                // console.log('%cSlovo: %c' + parsedWords[i] + '%c druh: %cVerb', 'color: #000000',
                // 'color: #5B9BD5', 'color: #000000', 'color: #C5D30B');
                wordArray[lastIndex] = this.getGifName(parsedWords[i], words.getVerbs());
                lastIndex++;
                if (i !== parsedWords.length - 1) {
                    wordArray[lastIndex] = ' ';
                    lastIndex++;
                }
                continue;
            }
            if (words.isNoun(parsedWords[i])) {
                // console.log('%cSlovo: %c' + parsedWords[i] + '%c druh: %cNoun',
                // 'color: #000000', 'color: #5B9BD5', 'color: #000000', 'color: #C5D30B');
                wordArray[lastIndex] = this.getGifName(parsedWords[i], words.getNouns());
                lastIndex++;
                if (i !== parsedWords.length - 1) {
                    wordArray[lastIndex] = ' ';
                    lastIndex++;
                }
                continue;
            }
            if (words.isOther(parsedWords[i])) {
                // console.log('%cSlovo: %c' + parsedWords[i] + '%c druh: %cOther',
                // 'color: #000000', 'color: #5B9BD5', 'color: #000000', 'color: #C5D30B');
                wordArray[lastIndex] = this.getGifName(parsedWords[i], words.getOthers());
                lastIndex++;
                if (i !== parsedWords.length - 1) {
                    wordArray[lastIndex] = ' ';
                    lastIndex++;
                }
                continue;
            }

            word = parsedWords[i];
            // console.log('%cSlovo: %c' + word + '%c druh: %cUnknown', 'color: #000000',
            // 'color: #5B9BD5', 'color: #000000', 'color: #CC0000');
            for (let j = 0; j < word.length; j++) {
                wordArray[lastIndex] = word[j];
                lastIndex++;
            }
            wordArray[lastIndex] = ' ';
            lastIndex++;
        }

        console.log(wordArray);
        return wordArray;
    }

    parseIntoWords(textT: String): string[] {
        const text = textT.toLowerCase();
        if (text.length === 1) {
            return [text];
        }
        let word = '';
        const parsedWords = [];
        let index = 0;
        for (let i = 0; i < text.length; i++) {
            if (!(text.charCodeAt(i) > 47 && text.charCodeAt(i) < 58) && // check for numeric
                !(text.charCodeAt(i) > 96 && text.charCodeAt(i) < 123) && // check for alpha
                !(text.charAt(i).match(/^ *$/) || text.charAt(i).match(/[?,.!]/) || i === text.length - 1) // im tired and lazy
            ) {
                continue;
            }
            if (text.charAt(i).match(/^ *$/) || text.charAt(i).match(/[?,.!]/) || i === text.length - 1) {
                if (word !== '') {
                    if (i === text.length - 1 && !text.charAt(i).match(/[?,.!]/)) {
                        word = word + text[i];
                    }
                    parsedWords[index] = word;
                    word = '';
                    index++;
                }
            } else {
                word = word + text[i];
            }
        }

        return parsedWords;
    }

    getGifName(word, array): string {
        for (let i = 0; i < array.length; i++) {
            for (let j = 0; j < array[i].length; j++) {
                if (word === array[i][j]) {
                    return array[i][0];
                }
            }
        }
        return '';
    }

    public correctDiacritics(text: String): String {
        // Diacritics
        let correctedTxt = text.toLowerCase().replace(/á/gi, 'a');
        correctedTxt = correctedTxt.toLowerCase().replace(/ä/gi, 'e');
        correctedTxt = correctedTxt.toLowerCase().replace(/č/gi, 'c');
        correctedTxt = correctedTxt.toLowerCase().replace(/ď/gi, 'd');
        correctedTxt = correctedTxt.toLowerCase().replace(/é/gi, 'e');
        correctedTxt = correctedTxt.toLowerCase().replace(/í/gi, 'i');
        correctedTxt = correctedTxt.toLowerCase().replace(/ĺ/gi, 'l');
        correctedTxt = correctedTxt.toLowerCase().replace(/ľ/gi, 'l');
        correctedTxt = correctedTxt.toLowerCase().replace(/ň/gi, 'n');
        correctedTxt = correctedTxt.toLowerCase().replace(/ó/gi, 'o');
        correctedTxt = correctedTxt.toLowerCase().replace(/ô/gi, 'o');
        correctedTxt = correctedTxt.toLowerCase().replace(/ŕ/gi, 'r');
        correctedTxt = correctedTxt.toLowerCase().replace(/š/gi, 's');
        correctedTxt = correctedTxt.toLowerCase().replace(/ť/gi, 't');
        correctedTxt = correctedTxt.toLowerCase().replace(/ú/gi, 'u');
        correctedTxt = correctedTxt.toLowerCase().replace(/ý/gi, 'y');
        correctedTxt = correctedTxt.toLowerCase().replace(/ž/gi, 'z');
        return correctedTxt;
    }

}
