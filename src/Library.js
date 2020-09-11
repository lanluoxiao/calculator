const findAffix = (string, prefix) => {
    let returnSet = new Set();
    for (let s of string) {
        for (let p of prefix) {
            if (s.startsWith(p) && s !== p) returnSet.add(s.slice(p.length))
        }
    }
    return returnSet
}

const wildcardExpansion = (alphabet, rawLanguage) => {
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

const isUnique = (alphabet, rawLanguage) => {
    let language = new Set(wildcardExpansion(alphabet, rawLanguage));
    let affix = new Set();
    let moreAffix = findAffix(language, language);
    let size = 0;

    do {
        size = affix.size
        affix = new Set([...affix, ...moreAffix])
        console.log(affix, language)
        moreAffix = new Set([...findAffix(language, affix), ...findAffix(affix, language)])
    } while (affix.size > size)
    let intersect = [...language].filter(x => affix.has(x))
    console.log(intersect);
    if (intersect.length === 0) return '是唯一码'
    else return '不是唯一码'
}

export default isUnique
