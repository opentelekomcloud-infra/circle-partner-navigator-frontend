import React, { useEffect } from 'react';

function Captcha({props}) {
    useEffect(() => {
        import("@cap.js/widget");
    }, []);

    return (
        <cap-widget
            data-cap-api-endpoint={`${props["captcha_url"]}${props["captcha_sitekey"]}/`}
            data-cap-hidden-field-name="cap-token"
        ></cap-widget>
    );
}

export default Captcha;
