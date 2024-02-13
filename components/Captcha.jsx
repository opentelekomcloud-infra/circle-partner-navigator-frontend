import React from 'react';
import { MCaptchaWidget } from '@mcaptcha/react-glue';

function Captcha() {
    const config = {
        widgetLink: new URL('https://mcaptcha.strapi.schreiber-ling.de/widget/?sitekey=RxZhnXBKERnTNRUAuNABst0v1Zvj5DZe')
    };
    
    return (
            <MCaptchaWidget {...config} />
    );
}

export default Captcha;
