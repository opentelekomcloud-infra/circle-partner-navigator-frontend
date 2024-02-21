'use client';

import React from 'react';
import styles from '@/styles/ContactForm.module.css';


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
                <form className={styles.form_wrapper}>
                    <scale-radio-button-group
                        label={data[locale].salutation}
                        class={styles.radio_buttons}>
                        <scale-radio-button
                            value="1"
                            label={data[locale].w}
                            checked="true"
                            name="radioStandard"
                            transparent="true"
                            input-id="choiceStandardOne"
                        ></scale-radio-button>
                        <scale-radio-button
                            value="2"
                            label={data[locale].m}
                            name="radioStandard"
                            input-id="choiceStandardTwo"
                        ></scale-radio-button>
                        <scale-radio-button
                            value="3"
                            label={data[locale].x}
                            name="radioStandard"
                            input-id="choiceStandardThree"
                        ></scale-radio-button>
                    </scale-radio-button-group>                
                    <scale-text-field
                        label={data[locale].name}
                        required="true"
                        class={styles.item}
                    ></scale-text-field>
                    <scale-text-field
                        label={data[locale].surname}
                        required="true"
                        class={styles.item}
                    ></scale-text-field>
                    <scale-text-field
                        label={data[locale].mail}
                        type="email"
                        required="true"
                        class={styles.item}
                    ></scale-text-field>
                    <scale-text-field
                        label={data[locale].company}
                        class={styles.item}
                    ></scale-text-field>
                    <scale-text-field
                        label={data[locale].phone}
                        class={styles.item}
                    ></scale-text-field>
                    <scale-textarea
                        label={data[locale].message}
                        rows="3"
                        resize="vertical"
                        class={styles.message}>
                    </scale-textarea>
                    <scale-checkbox
                        class={styles.checkbox}
                        required="true"
                        label={data[locale].agreement}
                        >
                    </scale-checkbox>
                    <scale-button
                        type="submit"
                        >{data[locale].submit}
                    </scale-button>                
                </form>
            </div>
        </div>
    )
}

export default PartnerContactForm;