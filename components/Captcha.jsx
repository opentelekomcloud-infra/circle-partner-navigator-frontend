import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import '@/styles/Captcha.css';

const Captcha = forwardRef(({ props }, ref) => {
    const captchaRef = useRef(null);
    const capInstanceRef = useRef(null);

    useEffect(() => {
        // The widget fetches its solver from cdn.jsdelivr.net by default. The
        // pinned copies live in public/cap so the page needs no third-party
        // host; see docs/cap-wasm.md for the versions and checksums.
        window.CAP_CUSTOM_WASM_URL = "/cap/cap_wasm_bg.wasm";
        window.CAP_CUSTOM_HASHWX_URL = "/cap/hashwx.wasm";
        window.CAP_PAKO_URL = "/cap/pako_inflate.min.js";

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
