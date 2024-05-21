

export default (text: string) => {
    
    return text.toLocaleLowerCase().replace(/[^a-zA-Z0-9 ]/g, '').trim().replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}