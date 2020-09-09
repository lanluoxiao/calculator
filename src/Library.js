const findAffix = (string, prefix) => {
    let returnSet = new Set();
    for (let s of string) {
        for (let p of prefix) {
            if (s.startsWith(p) && s !== p) returnSet.add(s.slice(p.length))
        }
    }
    return returnSet
}

const wildcardExpansion = (rawLanguage, alphabet) => {
    let language = [...rawLanguage]
    while (!language.every(x => !x.includes('U'))) {
        let newLanguage = []
        for (let codeword of language) {
            if (codeword.includes('U')) {
                for (let letter of alphabet) {
                    newLanguage.push(codeword.replace('U', letter))
                }
            } else {
                newLanguage.push(codeword)
            }
        }
        language = newLanguage
    }
    return language
}

const isUnique = (rawLanguage, alphabet) => {
    let language = wildcardExpansion(rawLanguage, alphabet);
    let affix = new Set();
    let moreAffix = findAffix(language, language);
    let size = -1;

    while (affix.length > size) {
        size = affix.length
        console.log(moreAffix)
        affix.add(...moreAffix)
        moreAffix = new Set([...findAffix(language, affix), ...findAffix(affix, language)])
    }
    return [...language].filter(x => affix.has(x))
}

module.exports = isUnique
