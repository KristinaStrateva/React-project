import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import AuthContext from "../../contexts/authContext";
import * as itemsService from '../../services/itemsService';
import formCollectionName from "../../utils/formCollectionName";

import styles from './MyItems.module.css';
import mainStyle from '../../App.module.css';

export default function MyItems() {
    const [myItems, setMyItems] = useState([]);

    const { userId } = useContext(AuthContext);

    useEffect(() => {
        itemsService.getMyItems(userId)
            .then(result => setMyItems(result))
            .catch(err => console.log(err));
    }, []);

    return (
        <div className={styles.wrapper}>
            {myItems.length > 0 && myItems.map(item => {
                const collectionName = formCollectionName(item.collectionName);

                return (
                    <div key={item._id} className={styles["category-card-category-card"]}>
                        <img alt="image" src={item.imageUrl} className={styles["category-card-image"]} />
                        <h5>{item.name}</h5>
                        <Link to={`/${collectionName}/${item._id}/details`} className={mainStyle.button}>More details</Link>
                    </div>
                )
            })}

            {!myItems.length && <p>You don't have any items added yet!</p>}
        </div>
    );
}