'use client';

import styles from '../../styles/components.module.scss';
import { useProvider } from './provider';
import { useRef } from 'react';
import useToggle from './toggler';

const Search = () => {
    const {search, setListing} = useProvider();
    const {toggle, setToggle} = useToggle();
    const searcherRef = useRef<HTMLInputElement>(null);

    const toggleSearch = () => {
        setToggle(!toggle);
        if (searcherRef.current) {
            const { width } = searcherRef.current.getBoundingClientRect();
            document.body.style.setProperty('--searchWidth', !toggle ? width + 'px' : '0px');
        }
    }

    const handleChange = (e:any) => {
        const target = e.target;
        setListing({
            type: 'update',
            payload: target            
        });
    }

    return (
        <div className={[styles.search_wrapper, toggle ? styles.active : styles.inactive].join(' ')}>
            <div className={styles.search_input_wrapper}>
                <input id="searcher" name="search" ref={searcherRef} className={styles.search_input} onChange={handleChange} value={search} placeholder="search specific need"/>
            </div>
            <label className={styles.search_icon_wrapper} htmlFor="searcher" onClick={toggleSearch}>
                <svg viewBox="0 0 50 50" overflow="visible" className={styles.search_icon} version="1.1">
                    <circle cx="20" cy="20" r="15"/>
                    <path d="M 45 45 L 32.5 32.5"/>
                </svg>
            </label>
        </div>
    )
}

export default Search;