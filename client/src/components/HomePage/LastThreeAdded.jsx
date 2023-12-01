import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import * as itemsService from '../../services/itemsService';

import styles from './LastThreeAdded.module.css';
import mainStyle from '../../App.module.css';
import formCollectionName from '../../utils/formCollectionName';

export default function LastThreeAdded() {
    const [lastItems, setLastItems] = useState([]);

    useEffect(() => {
        itemsService.getAllItems()
            .then(items => {
                const sortedLastThreeItems = items.sort((a, b) => b._createdOn - a._createdOn).slice(0, 3);

                setLastItems(sortedLastThreeItems);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <div className={`${mainStyle["section-container"]} ${mainStyle["column"]}`}>
            <div className={mainStyle["max-width-container"]}>
                <div className={mainStyle["section-heading-section-heading"]}>
                    <h1 className={`${mainStyle["section-heading-text"]} ${mainStyle["Heading-2"]}`}>
                        <span>LAST ADDED</span>
                    </h1>
                    <span className={mainStyle["section-heading-text1"]}>
                        <span>
                            Check the last three added items
                        </span>
                    </span>
                </div>
                <div className={styles["home-cards-container"]}>
                    {lastItems.map(item => {
                        const collectionName = formCollectionName(item.collectionName);

                        return (
                            <div key={item._id} className={styles["category-card-category-card"]}>
                                <img alt="image" src={item.imageUrl} className={styles["category-card-image"]} />
                                <h3>{item.name}</h3>
                                <Link to={`/${collectionName}/${item._id}/details`} className={mainStyle.button}>More details</Link>
                            </div>
                        )
                    }
                    )}
                </div>
            </div>
        </div>
    );
}