'use client';

import React from 'react';
import styles from '@/styles/ContactForm.module.css';
import { ScaleButton } from '@telekom/scale-components-react';
import sendEmail from '@/lib/helpers'

const sendEmailButton = async (event) => {
    event.preventDefault(); // Prevent reloading of the page

    let messageContent = {}
    const formData = new FormData(event.target);
    formData.forEach((value, key) => {
        if (key === "checkbox") {
            return;
        } else {
            messageContent[`${key}`] = `${value}`
        }
    });

    const response = await sendEmail(messageContent)
    console.log(response)

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

function PartnerContactForm({prop}) {

    

    return (
        <div className={styles.container}>
            <div className={styles.container_width}>
                <h2 className={styles.center}>
                    Do you have questions about the Open Telekom Cloud partner programs?
                </h2>
                <form className={styles.form_wrapper} onSubmit={sendEmailButton}>
                    <scale-radio-button-group
                        label="Salutation*"
                        class={styles.radio_buttons}>
                        <scale-radio-button
                            value="Ms. / Mrs."
                            label="Ms. / Mrs."
                            checked="true"
                            name="Salutation"
                            transparent="true"
                            input-id="choiceStandardOne"
                        ></scale-radio-button>
                        <scale-radio-button
                            value="Mr."
                            label="Mr."
                            name="Salutation"
                            input-id="choiceStandardTwo"
                        ></scale-radio-button>
                        <scale-radio-button
                            value="Mx."
                            label="Mx."
                            name="Salutation"
                            input-id="choiceStandardThree"
                        ></scale-radio-button>
                    </scale-radio-button-group>                
                    <scale-text-field
                        label="Name*"
                        required="true"
                        name="name"
                        class={styles.item}
                    ></scale-text-field>
                    <scale-text-field
                        label="Surname*"
                        required="true"
                        name="surname"
                        class={styles.item}
                    ></scale-text-field>
                    <scale-text-field
                        label="E-Mail*"
                        type="email"
                        required="true"
                        name="email"
                        class={styles.item}
                    ></scale-text-field>
                    <scale-text-field
                        label="Company Name"
                        name="company"
                        class={styles.item}
                    ></scale-text-field>
                    <scale-text-field
                        label="Phone Number"
                        name="phone"
                        class={styles.item}
                    ></scale-text-field>
                    <scale-textarea
                        label="Your Message"
                        rows="3"
                        resize="vertical"
                        name="message"
                        class={styles.message}
                    ></scale-textarea>
                    <scale-checkbox
                        class={styles.checkbox}
                        name="checkbox"
                        required="true"
                        label="Yes, I herewith consent to the use of the data I supplied by T-Systems International GmbH for the purpose of giving advice on products and providing me with information by e-mail, post, telephone or online. Under the consent I have given here, the data shall be forwarded for these purposes exclusively within T-Systems International GmbH and Telekom Deutschland GmbH. I am entitled to withdraw my consent at any time by writing to T-Systems International GmbH (E-Mail: MAC-Support@telekom.de). I confirm that I have taken note of the information regarding the right to withdraw consent and of the privacy information. *"
                        >
                    </scale-checkbox>
                    <ScaleButton
                        id="contactSubmitButton"
                        type="submit"
                        >Submit
                    </ScaleButton>                
                </form>
            </div>
        </div>
    )
}

export default PartnerContactForm;