import {MalePatterns} from './male.patterns';
import {WomanPatterns} from './woman.patterns';
import {ItPattern} from './it.pattern';


export class PatternsManager {
    malePatterns: MalePatterns = new MalePatterns();
    womanPatterns: WomanPatterns = new WomanPatterns();
    itPattern: ItPattern = new ItPattern();

    public makeInflection(row: string): string[] {
        // row = '[mama] mamka #Z (mamusk mamink)#';

        const gifName = this.getGifName(row);
        const word = this.getWord(row);
        const info = this.getInfo(row);
        const pattern = this.getPattern(info);
        const base = this.getBase(info);
        const baseSingular = this.getBaseSingularOrPlural(base, 'S');
        const basePlural = this.getBaseSingularOrPlural(base, 'P');
        const isSpecial = this.isSpecial(info);

        if (pattern === 'CH' || pattern === 'H' || pattern === 'D' || pattern === 'S') {
            return this.malePatterns.inflect(word, baseSingular, basePlural, pattern, isSpecial, gifName);
        }
        if (pattern === 'Z' || pattern === 'U' || pattern === 'DL' || pattern === 'K' || pattern === 'G' || pattern === 'I') {
            return this.womanPatterns.inflect(word, baseSingular, basePlural, pattern, isSpecial, gifName);
        }
        if (pattern === 'M' || pattern === 'SR' || pattern === 'V' || pattern === 'DI') {
            return this.itPattern.inflect(word, baseSingular, basePlural, pattern, isSpecial, gifName);
        }
        if (pattern === 'P') {
            return [word];
        }

        /** PT2. FORMATED TEXT TO CHECK  SYNTAX**/
        // console.log('row: ' + row);
        // console.log('gifName: ' + gifName);
        // console.log('word: ' + word);
        // console.log('word length: ' + word.length);
        // console.log('info: ' + info);
        // console.log('pattern: ' + pattern);
        // console.log('base: ' + base);
        // console.log('baseSingular: ' + baseSingular);
        // console.log('basePlural: ' + basePlural);
        // console.log('isSpecial: ' + isSpecial);

        // const array = this.womanPatterns.inflect(word, baseSingular, basePlural, pattern, isSpecial, gifName);
        // for (let i = 1; i < array.length / 2; i++) {
        //     console.log(i + 1 + '.' + array[i] + '  ' + (i + 6) + '. ' + array[i + 6 ]);
        // }

        return ['Something went wrong (Could not make declension. Maybe missing pattern, check the syntax in txt.'];
    }

    getWord(row: string): string {
        let wordBuild = '';
        let index = 0;
        while (row[index] !== ']') {
            index++;
        }
        index += 2;
        for (let i = index; i < row.length; i++) {
            if (row[i] === ' ') { break; }
            if (!row[i].match(/[a-z]/)) {
                continue;
            }
            wordBuild = wordBuild + row[i];
        }

        return wordBuild;
    }

    getPattern(info: string): string {
        let pattern = '';

        for (let i = 1; i < info.length; i++) {
            if (info[i] !== ' ') {
                if (info[i] === '#') {
                    break;
                }
                pattern = pattern + info[i];
            } else {
                break;
            }
        }

        return pattern;
    }

    getBase(info: string): string {
        let base = '';
        for (let i = 0; i < info.length; i++) {
            if (info[i] === '(') {
                i++;
                while (info[i] !== ')') {
                    base = base + info[i];
                    i++;
                }
                break;
            }
        }
        return base;
    }

    getGifName(row: string): string {
        let name = '';
        for (let i = 0; i < row.length; i++) {
            if (row[i] === '[') {
                i++;
                while (row[i] !== ']') {
                    name = name + row[i];
                    i++;
                }
                break;
            }
        }
        return name;
    }

    getBaseSingularOrPlural(base: string, SorP: string): string {
        let baseSP = '';
        let j = 0;
        let onlyOneBase = true;

        for (let i = 0; i < base.length; i++) {
            if (base[i] === ' ') {
                onlyOneBase = false;
            }
        }

        if (onlyOneBase) {
            return base;
        }

        for (let i = 0; i < base.length; i++) {
            if (base[i] !== ' ') {
                baseSP = baseSP + base[i];
            } else {
                if ( SorP === 'S') {
                    return baseSP;
                } else {
                    baseSP = '';
                    j = i;
                    break;
                }
            }
        }

        for (let i = j; i < base.length; i++) {
            baseSP = baseSP + base[i];
        }

        return baseSP;

    }

    isSpecial(info: string): string {
        if (info[info.length - 2].toLowerCase() === 's' || info[info.length - 2].toLowerCase() === 'z') {
            return info[info.length - 2];
        }
        return '';
    }


    getInfo(row: string): string {
        let info = '';

        for (let i = 0; i < row.length; i++) {
            if (row[i] === '#') {
                do {
                    info = info + row[i];
                    i++;
                }while (row[i] !== '#');
                break;
            }
        }

        return info + '#';
    }

}
