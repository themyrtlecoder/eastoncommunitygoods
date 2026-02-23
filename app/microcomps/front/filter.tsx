'use client';

import { useProvider } from './provider';
import { useRef } from 'react';
import useToggle from './toggler';
import styles from '../../styles/components.module.scss';

const Filter = () => {
    const {filter, categories, setListing} = useProvider();
    const filterOptions = useRef(null);
    const {toggle, setToggle} = useToggle();

    const toggleCategories = () => {
        setToggle(!toggle);
        if (filterOptions.current) {
            const { height } = filterOptions.current.getBoundingClientRect();
            document.body.style.setProperty('--filterHeight', !toggle ? height + 'px' : '0px');
        }
    }

    const toggleFilter = (category:string) => {
        const foundCategory = filter.find(each => each === category);
        setListing({filter: foundCategory ? filter.filter(each => each !== category) : [...filter, category]}); 
        if (toggle) {
            setToggle(!toggle);
            document.body.style.setProperty('--filterHeight', '0px');
        }
    }

    return (
        <div className={styles.filter_wrapper}>
            <div className={styles.selected_filters_wrapper}>
            {filter.length < 1 ? <label>filter by category</label> : filter.map((each, index) => 
                <label className={styles.active_filter} key={'filter: '+each+index}>
                    {each}
                    <svg className={styles.remove_filter_icon} onClick={()=>toggleFilter(each)} viewBox="0 0 50 50" overflow="visible" version="1.1">
                        <path d="M 5 5 L 45 45"/>
                        <path d="M 5 45 L 45 5"/>
                    </svg>
                </label>
            )}
                <svg onClick={toggleCategories} viewBox="0 0 50 30" overflow="visible" className={[toggle ? styles.open : styles.close, styles.dropdown_icon].join(' ')} version="1.1">
                    <path d="M 5 5 L 25 25 L 45 5"/>
                </svg>
            </div>
            <div className={styles.categories_list_wrapper}>
                <ul className={styles.categories_list} ref={filterOptions}>
                    {categories.map((category: string, index: number) => <li key={category + index} onClick={()=>toggleFilter(category)} className={[filter.find(each => each === category) ? styles.active : styles.inactive].join(' ')}>{category}</li>)}
                </ul> 
            </div>     
        </div>
    )
}


export default Filter;