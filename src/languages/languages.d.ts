import { LanguageTexts } from ".";

declare module "*.json" {
    const texts : LanguageTexts;
    export default texts;
}
