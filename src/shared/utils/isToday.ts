export default (date: string) => {
    const today = new Date().toLocaleDateString();
    return new Date(date).toLocaleDateString() == today;
};