'use client';

import React, { useState, useEffect} from 'react';
import styles from '/styles/PartnerListing.module.css';
import Card from '/components/Card'
import CardFlexBox from '/components/CardFlexBox'
import { ScaleChip } from '@telekom/scale-components-react';


function PartnerListing({
    cachedPartners,
    cachedTags,
    cachedTagCategories,
    locale
}) {    
    // 'Partner Navigator' where partners are listed with tags
    const [allTags, setAllTags] = useState(cachedTags)
    const [partners, setPartners] = useState(cachedPartners)

    // changes tag chip state and triggers update of partner listing
    const changeChip = (id) => {
        const updatedTags = allTags.map(tag => {
            if (tag.id.toString() === id.target.getAttribute("filter_id").toString()) {
                tag["state"] = !tag["state"];
            }
            return tag;
        });
        setAllTags(updatedTags);
        updatePartners(updatedTags);
    };

    // Returns true if all clicked tags are included in the specific partner taglist
    function tagsIncluded(partnerTags, targetTagIds) {
        // Returns true if all clicked tags are included in the specific partner taglist
        return targetTagIds.every((targetTag) =>
          partnerTags.some(tag => tag.id === targetTag)
        );
    }

    // Update number of listed partners according to chosen tags
    const updatePartners = () => {
        let localPartners = []
        let localTags = []
        allTags.map(tag => {
        // find the tags which are activated and save them in localTags
            if (tag["state"]) {
                localTags.push(tag.id)
            }
        })
        if (localTags.length === 0) {
        // reset all partners if all tags have 'state == false' and leave the execution
            return (setPartners(cachedPartners))
        }
        cachedPartners.map((partner) => {
        // filter partners how have one or more of the selected tags
            if (tagsIncluded(partner.attributes.tags.data, localTags)) {
              localPartners.push(partner);
            }
        });
        setPartners(localPartners)
    };

    // runs at start to set all available tags
    useEffect(() => {
        let localTags = allTags.map(el => {
            el["state"] = false
            return (el)
        })
        setAllTags(localTags)
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.container_width}>
                {/* Tag Filter */}
                {allTags ? (
                    <scale-accordion expanded="true">
                        {cachedTagCategories ? (
                            cachedTagCategories.map(cat => {
                                return (
                                    <scale-collapsible
                                        key={cat.id}>
                                            <span slot="heading">{cat.attributes.name}</span>
                                        <div className={styles.checkboxwrapper}>
                                            {allTags.map(tag => {
                                                if (tag.attributes.tag_category.data !== null) {
                                                    
                                                    // Check if tag belongs to tag category by verifying IDs
                                                    if ( tag.attributes.tag_category.data.id === cat.id) {
                                                        return (
                                                            <ScaleChip
                                                                key={tag.id}
                                                                onScaleChange={changeChip}
                                                                filter_id={tag.id}>{tag.attributes.name}
                                                            </ScaleChip>
                                                        )                                                
                                                    }
                                                } else {
                                                    console.error(`Tag ${tag.attributes.name} has no tag_category assigned!`);
                                                }
                                            })}
                                        </div>
                                    </scale-collapsible>
                                )
                            } )
                        ) : (
                            <p>ERROR: cachedTagCategories data not available.</p>
                        )}
                    </scale-accordion>
                ) : (
                    <p>ERROR: allTags data not available.</p>
                )}
                {/* Partner Listing */}
                {partners ? (
                    <CardFlexBox>
                        {partners.map(partner => {
                            return (
                                <Card key={partner.attributes.partner_id} props={partner} locale={locale}></Card>
                            );
                        })}
                    </CardFlexBox>
                ) : (
                    <p>ERROR: Partner data not available.</p>
                )}
            </div>
        </div>
    );
    
}

export default PartnerListing;