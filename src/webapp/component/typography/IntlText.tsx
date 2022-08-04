import React from "react";
import { useLanguagePack } from "../../utils/intl";

interface IntlTextProps {
    text : string;
}

const IntlText : React.FC<IntlTextProps> = ({ text }) => {
    const [pack] = useLanguagePack();
    return <>{pack.texts[text]}</>;
};

// IntlText.defaultProps = {
//     text: "string",
// };

export default IntlText;
