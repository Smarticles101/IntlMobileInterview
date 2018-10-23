let repeats = str => {
    let wordCount = {}
    str.toLowerCase()
    .replace(/[.,@]/g, "")
    .split(" ").forEach(word => {
        wordCount[word] = wordCount[word] ? wordCount[word] + 1 : 1;
    })

    return Object.keys(wordCount).map(word => ({ [word]: wordCount[word] }));
}

let testRepeats = "Walmart Technology is reinventing the way the world shops and we’ve only just begun. Our team includes @Walmart Labs in Silicon Valley and Bengaluru, which powers the eCommerce experience, as well as technology teams across data and analytics, retail, back office and more who help power store and digital experiences."

console.log(repeats(testRepeats));
