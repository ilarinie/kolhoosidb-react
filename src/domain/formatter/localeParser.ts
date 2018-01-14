export const parseLocale = (): string => {
    if (navigator.languages && navigator.languages[0]) {
        return navigator.languages[0];
    }
    if (navigator.language) {
        return navigator.language;
    }
    return 'en-US';
};
