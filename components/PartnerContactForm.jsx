'use client';

import React from 'react';
import styles from '@/styles/ContactForm.module.css';
import sendEmail from '@/lib/helpers'
import Captcha from '/components/Captcha';
import { ScaleButton, ScaleTextarea } from '@telekom/scale-components-react';

// Settings for correct Captcha workflow
const captchaSettings = {
    captcha_sitekey: "CsJJsEtUfmwc0MJgMaJOajmEbYSBgGM6",
    captcha_url: "https://mcaptcha.otc-service.com/"
}

const sendEmailButton = async (event) => {
    event.preventDefault(); // Prevent reloading of the page

    let messageContent = {}
    const formData = new FormData(event.target);
    formData.forEach((value, key) => {
        if (key === "checkbox") {
            return;
        } else if (key === "mcaptcha__token") {
            return;
        }
        else {
            messageContent[`${key}`] = `${value}`
        }
    });
    const captcha_token = document.getElementById("mcaptcha__token").value

    const response = await sendEmail(messageContent, captcha_token, captchaSettings["captcha_sitekey"])

    if (response["status"] !== "success") {
        const notificationHTML = `
            <scale-notification
            heading="Something went wrong while sending your E-Mail."
            dismissible
            opened
            variant="danger"
            >
            <span slot="text">Feel free to open an issue on the following page: <a href="https://github.com/opentelekomcloud-infra/circle-partner-navigator-frontend/issues">https://github.com/opentelekomcloud-infra/circle-partner-navigator-frontend/issues</a></span>
            <p slot="text">Error Code: ${response["message"]}</p>
            </scale-notification>
        `
        document.getElementById("contactSubmitButton").insertAdjacentHTML("beforebegin", notificationHTML)
    }
    else if (response["status"] === "success") {
        event.target.reset();
        const notificationHTML = `
            <scale-notification
            heading="E-Mail sent successfully. We will answer your request soon."
            dismissible
            opened
            delay="6000"
            variant="success"
            >
            </scale-notification>
        `
        document.getElementById("contactSubmitButton").insertAdjacentHTML("beforebegin", notificationHTML)
    }

}

const renderCaptcha = (event) => {
    document.getElementById("captcha").classList.remove(`${styles.no_display}`)
}


function PartnerContactForm({locale}) {
    const data = {
        'de-DE': {
            'headline': 'Haben Sie Fragen zum Open Telekom Cloud Partner Programm?',
            'salutation': 'Anrede',
            'w': 'Frau',
            'm': 'Herr',
            'x': 'Divers',
            'name': 'Vorname',
            'surname': 'Nachname',
            'mail': 'E-Mail',
            'company': 'Firmenname',
            'phone': 'Telefonnummer',
            'message': 'Ihre Nachricht',
            'agreement': 'Ja, ich bin damit einverstanden, dass die T-Systems International GmbH die von mir angegebenen Daten für die Beratung zu Produkten und zu meiner Information per E-Mail, Post, Telefon, SMS oder MMS verwendet. Die Weitergabe der Daten zu diesen Zwecken erfolgt im Rahmen der von mir erteilten Einwilligung ausschließlich innerhalb der T-Systems International GmbH und der Telekom Deutschland GmbH. Ich kann meine Einwilligung jederzeit per E-Mail an MAC-Support@telekom.de widerrufen. Die Hinweise zum Widerrufsrecht sowie die Datenschutzerklärung habe ich zur Kenntnis genommen. *',
            'submit': 'Absenden',
        },
        'en': {
            'headline': 'Do you have questions about the Open Telekom Cloud partner programs?',
            'salutation': 'Salutation',
            'w': 'Mrs.',
            'm': 'Mr.',
            'x': 'Mx',
            'name': 'Name',
            'surname': 'Surname',
            'mail': 'E-Mail',
            'company': 'Company Name',
            'phone': 'Phone Number',
            'message': 'Your Message',
            'agreement': 'Yes, I herewith consent to the use of the data I supplied by T-Systems International GmbH for the purpose of giving advice on products and providing me with information by e-mail, post, telephone or online. Under the consent I have given here, the data shall be forwarded for these purposes exclusively within T-Systems International GmbH and Telekom Deutschland GmbH. I am entitled to withdraw my consent at any time by writing to T-Systems International GmbH (E-Mail: MAC-Support@telekom.de). I confirm that I have taken note of the information regarding the right to withdraw consent and of the privacy information. *',
            'submit': 'Submit',
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.container_width}>
                <h2 className={styles.center}>
                    {data[locale].headline}
                </h2>
                <form className={styles.form_wrapper} onSubmit={sendEmailButton}>
                    <scale-radio-button-group
                        label={data[locale].salutation}
                        class={styles.radio_buttons}>
                        <scale-radio-button
                            value={data[locale].w}
                            label={data[locale].w}
                            checked="true"
                            name="Salutation"
                            transparent="true"
                            input-id="choiceStandardOne"
                        ></scale-radio-button>
                        <scale-radio-button
                            value={data[locale].m}
                            label={data[locale].m}
                            name="Salutation"
                            input-id="choiceStandardTwo"
                        ></scale-radio-button>
                        <scale-radio-button
                            value={data[locale].x}
                            label={data[locale].x}
                            name="Salutation"
                            input-id="choiceStandardThree"
                        ></scale-radio-button>
                    </scale-radio-button-group>                
                    <scale-text-field
                        label={data[locale].name}
                        required="true"
                        name="name"
                        class={styles.item}
                    ></scale-text-field>
                    <scale-text-field
                        label={data[locale].surname}
                        required="true"
                        name="surname"
                        class={styles.item}
                    ></scale-text-field>
                    <scale-text-field
                        label={data[locale].mail}
                        type="email"
                        required="true"
                        name="email"
                        class={styles.item}
                    ></scale-text-field>
                    <scale-text-field
                        label={data[locale].company}
                        name="company"
                        class={styles.item}
                    ></scale-text-field>
                    <scale-text-field
                        label={data[locale].phone}
                        name="phone"
                        class={styles.item}
                    ></scale-text-field>
                    <ScaleTextarea
                        label={data[locale].message}
                        rows="3"
                        resize="vertical"
                        name="message"
                        required="true"
                        onScale-input={renderCaptcha}
                        class={styles.message}
                    ></ScaleTextarea>
                    <scale-checkbox
                        class={styles.checkbox}
                        required="true"
                        name="checkbox"
                        label={data[locale].agreement}
                        >
                    </scale-checkbox>
                    <div id="captcha" class={`${styles.captcha} ${styles.no_display}`}>
                        <Captcha props={captchaSettings}></Captcha>
                    </div>
                    <ScaleButton
                        id="contactSubmitButton"
                        type="submit"
                        >{data[locale].submit}
                    </ScaleButton>                  
                </form>
            </div>
        </div>
    )
}

export default PartnerContactForm;