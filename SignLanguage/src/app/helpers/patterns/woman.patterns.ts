export class WomanPatterns {

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
            case 'Z': {
                // uhorka zena uhoriek zien
                let dativPL = '';
                for (let i = 0; i < basePlural.length - 1; i++) {
                    if (i === basePlural.length - 2 && basePlural[basePlural.length - 2] === 'e' ) {
                        break;
                    } else {
                        dativPL = dativPL + basePlural[i];
                    }
                }
                arrayResult[1] = word;
                arrayResult[2] = baseSingular + 'y';
                arrayResult[3] = baseSingular + 'e';
                arrayResult[4] = baseSingular + 'u';
                arrayResult[5] = baseSingular + 'e';
                arrayResult[6] = baseSingular + 'ou';
                arrayResult[7] = basePlural + 'y';
                if (isSpec === 'S') {
                    arrayResult[8] = basePlural;
                } else {
                    arrayResult[8] = dativPL + 'ie' + baseSingular[baseSingular.length - 1];
                }
                arrayResult[9] = basePlural + 'am';
                arrayResult[10] = basePlural + 'y';
                arrayResult[11] = basePlural + 'ach';
                arrayResult[12] = basePlural + 'ami';
                break;
            }
            case 'U': {
                arrayResult[1] = word;
                arrayResult[2] = baseSingular + 'e';
                arrayResult[3] = baseSingular + 'i';
                arrayResult[4] = baseSingular + 'u';
                arrayResult[5] = baseSingular + 'i';
                arrayResult[6] = baseSingular + 'ou';
                arrayResult[7] = basePlural + 'e';
                arrayResult[8] = basePlural;
                arrayResult[9] = basePlural + 'iam';
                arrayResult[10] = basePlural + 'e';
                arrayResult[11] = basePlural + 'iach';
                arrayResult[12] = basePlural + 'ami';
                break;
            }
            case 'DL': {
                arrayResult[1] = word;
                arrayResult[2] = baseSingular + 'e';
                arrayResult[3] = baseSingular + 'i';
                arrayResult[4] = baseSingular;
                arrayResult[5] = baseSingular + 'i';
                arrayResult[6] = baseSingular + 'ou';
                arrayResult[7] = basePlural + 'e';
                arrayResult[8] = basePlural + 'i';
                arrayResult[9] = basePlural + 'iam';
                arrayResult[10] = basePlural + 'e';
                arrayResult[11] = basePlural + 'iach';
                arrayResult[12] = basePlural + 'ami';
                break;
            }
            case 'K': {
                arrayResult[1] = word;
                arrayResult[2] = baseSingular + 'i';
                arrayResult[3] = baseSingular + 'i';
                arrayResult[4] = baseSingular;
                arrayResult[5] = baseSingular + 'i';
                arrayResult[6] = baseSingular + 'ou';
                arrayResult[7] = basePlural + 'i';
                arrayResult[8] = basePlural + 'i';
                arrayResult[9] = basePlural + 'iam';
                arrayResult[10] = basePlural + 'i';
                arrayResult[11] = basePlural + 'iach';
                arrayResult[12] = basePlural + 'ami';
                break;
            }
            case 'G': {
                arrayResult[1] = word;
                arrayResult[2] = baseSingular + 'ej';
                arrayResult[3] = baseSingular + 'ej';
                arrayResult[4] = baseSingular + 'u';
                arrayResult[5] = baseSingular + 'ej';
                arrayResult[6] = baseSingular + 'ou';
                arrayResult[7] = basePlural + 'e';
                arrayResult[8] = basePlural;
                arrayResult[9] = basePlural + 'am';
                arrayResult[10] = basePlural + 'e';
                arrayResult[11] = basePlural + 'ach';
                arrayResult[12] = basePlural + 'ami';
                break;
            }
            case 'I': {
                arrayResult[1] = word;
                arrayResult[2] = baseSingular + 'y';
                arrayResult[3] = baseSingular + 'i';
                arrayResult[4] = baseSingular + 'u';
                arrayResult[5] = baseSingular + 'i';
                arrayResult[6] = baseSingular + 'ou';
                arrayResult[7] = basePlural + 'y';
                arrayResult[8] = basePlural + 'i';
                arrayResult[9] = basePlural + 'am';
                arrayResult[10] = basePlural + 'y';
                arrayResult[11] = basePlural + 'ach';
                arrayResult[12] = basePlural + 'ami';
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
