import { LanguagePack, languages } from "../languages/languages";
import { createGlobalState, useGlobalState } from "./state";

export const LanguageContext = createGlobalState<LanguagePack>(languages["en-us"]);

export function useLanguagePack() : [LanguagePack, (locale : string) => void] {
    const [language, setLanguage] = useGlobalState(LanguageContext);
    return [
        language,
        (locale : string) : void => {
            setLanguage(languages[locale]);
        },
    ];
}
