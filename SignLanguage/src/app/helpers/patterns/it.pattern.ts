export class ItPattern {

    public inflect(word: string, baseSingular: string, basePlural: string, pattern: string, isSpec: string, gifName: string): string[] {
        if (baseSingular === '') {
            baseSingular = word;
        }
        if (basePlural === '') {
            basePlural = baseSingular;
        }

        const arrayResult = [];
        arrayResult[0] = gifName;

        switch (pattern) {
            case 'M': {
                let dativPL = '';
                for (let i = 0; i < baseSingular.length - 1; i++) {
                    if (i === baseSingular.length - 2 && baseSingular[baseSingular.length - 2] === 'e' ) {
                        break;
                    } else {
                        dativPL = dativPL + baseSingular[i];
                    }
                }
                arrayResult[1] = word;
                arrayResult[2] = baseSingular + 'a';
                arrayResult[3] = baseSingular + 'u';
                arrayResult[4] = baseSingular + 'o';
                arrayResult[5] = baseSingular + 'e';
                arrayResult[6] = baseSingular + 'om';
                arrayResult[7] = basePlural + 'a';
                if (isSpec === 'S') {
                    arrayResult[8] = basePlural;
                } else {
                    arrayResult[8] = dativPL + 'ie' + baseSingular[baseSingular.length - 1];
                }
                arrayResult[9] = basePlural + 'am';
                arrayResult[10] = basePlural + 'a';
                arrayResult[11] = basePlural + 'ach';
                arrayResult[12] = basePlural + 'ami';
                break;
            }
            case 'SR': {
                arrayResult[1] = word;
                arrayResult[2] = baseSingular + 'a';
                arrayResult[3] = baseSingular + 'u';
                arrayResult[4] = baseSingular + 'e';
                arrayResult[5] = baseSingular + 'i';
                arrayResult[6] = baseSingular + 'om';
                arrayResult[7] = basePlural + 'ia';
                if (isSpec === 'S') {
                    arrayResult[8] = basePlural + 'i';
                } else {
                    arrayResult[8] = basePlural;
                }
                arrayResult[9] = basePlural + 'iam';
                arrayResult[10] = basePlural + 'ia';
                arrayResult[11] = basePlural + 'iach';
                arrayResult[12] = basePlural + 'ami';
                break;
            }
            case 'V': {
                arrayResult[1] = word;
                arrayResult[2] = baseSingular + 'ia';
                arrayResult[3] = baseSingular + 'iu';
                arrayResult[4] = baseSingular + 'ie';
                arrayResult[5] = baseSingular + 'i';
                arrayResult[6] = baseSingular + 'im';
                arrayResult[7] = basePlural + 'ia';
                arrayResult[8] = basePlural + 'i';
                arrayResult[9] = basePlural + 'iam';
                arrayResult[10] = basePlural + 'ia';
                arrayResult[11] = basePlural + 'iach';
                arrayResult[12] = basePlural + 'iami';
                break;
            }
            case 'DI': {
                arrayResult[1] = word;
                arrayResult[2] = baseSingular + 'ata';
                arrayResult[3] = baseSingular + 'atu';
                arrayResult[4] = baseSingular + 'a';
                arrayResult[5] = baseSingular + 'ati';
                arrayResult[6] = baseSingular + 'atom';
                arrayResult[7] = basePlural + 'ata';
                arrayResult[8] = basePlural + 'at';
                arrayResult[9] = basePlural + 'atam';
                arrayResult[10] = basePlural + 'ata';
                arrayResult[11] = basePlural + 'atach';
                arrayResult[12] = basePlural + 'atami';
                break;
            }
            default: {
                if (word === '') {
                    arrayResult[0] = 'Slovo nenajdene, je syntax v textáku spravna?';
                } else {
                    arrayResult[0] = word;
                }
                arrayResult[1] = 'Nenasiel sa pad pre slovo: ' + word + '. Check syntax v textáku. ';
            }
        }

        return arrayResult;
    }


}
