import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import '@/styles/Captcha.css';

const Captcha = forwardRef(({ props }, ref) => {
    const captchaRef = useRef(null);
    const capInstanceRef = useRef(null);

    useEffect(() => {
        import("@cap.js/widget").then(async ({ Cap }) => {
            capInstanceRef.current = new Cap({
                apiEndpoint: `${props["captcha_url"]}${props["captcha_sitekey"]}/`
            });
        });
    }, [props]);

    useImperativeHandle(ref, () => ({
        reset() {
            if (capInstanceRef.current) {
                capInstanceRef.current.reset();
            }
        },
        getToken() {
            if (capInstanceRef.current) {
                return capInstanceRef.current.token;
            }
            return null;
        }
    }));

    return (
        <cap-widget
            ref={captchaRef}
            data-cap-api-endpoint={`${props["captcha_url"]}${props["captcha_sitekey"]}/`}
            data-cap-hidden-field-name="cap-token"
        ></cap-widget>
    );
});

export default Captcha;
