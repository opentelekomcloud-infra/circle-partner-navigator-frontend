'use client';

import React from 'react';
import styles from '../styles/ContactForm.module.css';


function PartnerContactForm({prop}) {
    return (
        <div className={styles.container}>
            <div className={styles.container_width}>
                <h2 className={styles.center}>
                    Do you have questions about the Open Telekom Cloud partner programs?
                </h2>
                <form className={styles.form_wrapper}>
                    <scale-radio-button-group
                        label="Salutation*"
                        class={styles.radio_buttons}>
                        <scale-radio-button
                            value="1"
                            label="Ms. / Mrs."
                            checked="true"
                            name="radioStandard"
                            transparent="true"
                            input-id="choiceStandardOne"
                        ></scale-radio-button>
                        <scale-radio-button
                            value="2"
                            label="Mr."
                            name="radioStandard"
                            input-id="choiceStandardTwo"
                        ></scale-radio-button>
                        <scale-radio-button
                            value="3"
                            label="Mx."
                            name="radioStandard"
                            input-id="choiceStandardThree"
                        ></scale-radio-button>
                    </scale-radio-button-group>                
                    <scale-text-field
                        label="Name*"
                        required="true"
                        class={styles.item}
                    ></scale-text-field>
                    <scale-text-field
                        label="Surname*"
                        required="true"
                        class={styles.item}
                    ></scale-text-field>
                    <scale-text-field
                        label="E-Mail*"
                        type="email"
                        required="true"
                        class={styles.item}
                    ></scale-text-field>
                    <scale-text-field
                        label="Company Name"
                        class={styles.item}
                    ></scale-text-field>
                    <scale-text-field
                        label="Phone Number"
                        class={styles.item}
                    ></scale-text-field>
                    <scale-textarea
                        label="Your Message"
                        rows="3"
                        resize="vertical"
                        class={styles.message}>
                    </scale-textarea>
                    <scale-checkbox
                        class={styles.checkbox}
                        required="true"
                        label="Yes, I herewith consent to the use of the data I supplied by T-Systems International GmbH for the purpose of giving advice on products and providing me with information by e-mail, post, telephone or online. Under the consent I have given here, the data shall be forwarded for these purposes exclusively within T-Systems International GmbH and Telekom Deutschland GmbH. I am entitled to withdraw my consent at any time by writing to T-Systems International GmbH (E-Mail: MAC-Support@telekom.de). I confirm that I have taken note of the information regarding the right to withdraw consent and of the privacy information. *"
                        >
                    </scale-checkbox>
                    <scale-button
                        type="submit"
                        >Submit
                    </scale-button>                
                </form>
            </div>
        </div>
    )
}

export default PartnerContactForm;