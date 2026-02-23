'use client';

import styles from '../../styles/components.module.scss';
import Search from './search';
import Filter from './filter';
import { useProvider } from './provider';


const Navigation = ({pending}:{pending: boolean}) => {

    const {update} = useProvider();

    return (
        <nav className={styles.navigation}>
            <div className={styles.color_wrapper}>
                <div className={styles.header_wrapper}>
                    <svg className={styles.header} viewBox="0 0 222 18">
                        <text x="0" y="15">easton community goods</text>
                    </svg>
                </div>
                <div className={styles.overview_wrapper}>
                    <h4>emergency needs list</h4>
                    <h4 className={[pending && styles.italized].join(' ')}>last updated: <span>{pending ? 'fetching date' : update}</span></h4>
                </div>
            </div>
            
            <div className={styles.review_wrapper}>
                <Filter/>
                <Search/>
            </div> 
        </nav>
    )
}

export default Navigation;