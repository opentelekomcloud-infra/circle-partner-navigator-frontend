import React from 'react';
import { MCaptchaWidget } from '@mcaptcha/react-glue';

function Captcha({props}) {
    const config = {
        widgetLink: new URL(`${props["captcha_url"]}widget/?sitekey=${props["captcha_sitekey"]}`)
    };
    
    return (
            <MCaptchaWidget {...config} />
    );
}

export default Captcha;
