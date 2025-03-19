import { TContact } from "../../../services/types";

import styles from './contact-item.module.scss'

export const ContactItem = ({data}: {data: TContact}) => {
    return (
        <div className={styles.container}>
            <h2>{data.person}</h2>
            <p>{data.messenger}</p>
            <p>{data.email}</p>
        </div>
    )
}