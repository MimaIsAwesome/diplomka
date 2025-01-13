export class MalePatterns {

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
            case 'CH': {
                arrayResult[1] = word;
                arrayResult[2] = baseSingular + 'a';
                arrayResult[3] = baseSingular + 'ovi';
                arrayResult[4] = baseSingular + 'a';
                arrayResult[5] = baseSingular + 'ovi';
                arrayResult[6] = baseSingular + 'om';
                if (isSpec !== 'Z') {
                    if (isSpec === 'S') {
                        arrayResult[7] = basePlural + 'ovia';
                    } else {
                        arrayResult[7] = basePlural + 'i';
                    }
                    arrayResult[8] = basePlural + 'ov';
                    arrayResult[9] = basePlural + 'om';
                    arrayResult[10] = basePlural + 'ov';
                    arrayResult[11] = basePlural + 'och';
                    if (isSpec === 'S') {
                        arrayResult[11] = basePlural + 'ami';
                    } else {
                        arrayResult[11] = basePlural + 'mi';
                    }
                } else {
                    arrayResult[7] = basePlural + 'y';
                    arrayResult[8] = basePlural + 'ov';
                    arrayResult[9] = basePlural + 'om';
                    arrayResult[10] = basePlural + 'y';
                    arrayResult[11] = basePlural + 'och';
                    arrayResult[12] = basePlural + 'ami';
                }
                break;
            }
            case 'H': {
                arrayResult[1] = word ;
                arrayResult[2] = baseSingular + 'u';
                arrayResult[3] = baseSingular + 'ovi';
                arrayResult[4] = baseSingular + 'u';
                arrayResult[5] = baseSingular + 'ovi';
                arrayResult[6] = baseSingular + 'om';
                arrayResult[7] = basePlural + 'ovia';
                arrayResult[8] = basePlural + 'ov';
                arrayResult[9] = basePlural + 'om';
                arrayResult[10] = basePlural + 'ov';
                arrayResult[11] = basePlural + 'och';
                arrayResult[12] = basePlural + 'ami';
                break;
            }
            case 'D': {
                arrayResult[1] = word;
                if (isSpec === 'S') {
                    arrayResult[2] = baseSingular + 'a';
                } else {
                    arrayResult[2] = baseSingular + 'u';
                }
                arrayResult[3] = baseSingular + 'u';
                arrayResult[4] = baseSingular;
                arrayResult[5] = baseSingular + 'e';
                arrayResult[6] = baseSingular + 'om';

                arrayResult[7] = basePlural + 'y';
                arrayResult[8] = basePlural + 'ov';
                arrayResult[9] = basePlural + 'om';
                arrayResult[10] = basePlural + 'y';
                arrayResult[11] = basePlural + 'och';
                if (isSpec === 'S') {
                    arrayResult[12] = basePlural + 'ami';
                } else {
                    arrayResult[12] = basePlural + 'mi';
                }
                break;
            }
            case 'S': {
                arrayResult[1] = word;
                arrayResult[2] = baseSingular + 'a';
                arrayResult[3] = baseSingular + 'u';
                arrayResult[4] = baseSingular;
                arrayResult[5] = baseSingular + 'i';
                arrayResult[6] = baseSingular + 'om';
                arrayResult[7] = basePlural + 'e';
                arrayResult[8] = basePlural + 'ov';
                arrayResult[9] = basePlural + 'om';
                arrayResult[10] = basePlural + 'e';
                arrayResult[11] = basePlural + 'och';
                arrayResult[12] = basePlural + 'mi';
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
