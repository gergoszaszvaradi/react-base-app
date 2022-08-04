import enTexts from "./en-us.json";
import deTexts from "./de-de.json";

export interface LanguageTexts {readonly [key : string] : string};

export interface LanguagePack {
    locale : string;
    texts : LanguageTexts;
}

export interface LanguageCollection {readonly [key : string] : LanguagePack};

export const languages : LanguageCollection = {
    "en-us": {
        locale: "en-us",
        texts: enTexts,
    },
    "de-de": {
        locale: "de-de",
        texts: deTexts,
    },
};
