export const parseLocale = (): string => {
    if (navigator.languages[0]) {
        return navigator.languages[0];
    }
    return navigator.language;
};