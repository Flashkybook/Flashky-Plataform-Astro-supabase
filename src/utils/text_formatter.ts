

export default (text: string) => {
    return text
        .trim()
        .toLocaleLowerCase()
        .replace(/[^a-zA-Z0-9' ]/g, '')

}
