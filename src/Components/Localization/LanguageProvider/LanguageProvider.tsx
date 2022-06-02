import { ReactNode } from 'react';
import PropTypes from 'prop-types';
// import { IntlProvider } from 'react-intl';
import { translatedMessages } from './LanguageConstains';
import React from 'react';

interface LanguageProviderProps {
  locale: any;
  children: ReactNode
}

//React.ReactElement

function LanguageProvider(props: LanguageProviderProps){
    return (
        <div>
            
        </div>
    // <IntlProvider locale={props.locale} messages={props.locale === "ua" ? translatedMessages.pl : translatedMessages.en}>
    //     { props.children }
    // </IntlProvider>
    );
}
LanguageProvider.propTypes = {
    locale: PropTypes.string,
    children: PropTypes.element.isRequired,
};
export default LanguageProvider;