import styles from '../../styles/components.module.scss';

import useToggle from './toggler';

const Footer = () => {
    const {toggle, setToggle} = useToggle();
    return (
        <footer className={styles.footer}>
            <section className={[styles.about, toggle && styles.active].join(' ')}>
                <p><span>easton community goods</span>&nbsp; is a digital space created to share emergency needs and aide in future community organization.</p>
            </section>
            <svg onClick={()=>setToggle(!toggle)} className={[styles.learn_icon, toggle && styles.flip].join(' ')} viewBox="0 0 50 50" overflow="visible" version="1.1">
                <circle cx="25" cy="25" r="30"/>
                <text x="25" y="30" alignmentBaseline="middle" dominantBaseline="middle" textAnchor="middle" fontSize="50">?</text>
            </svg>
        </footer>
    )
}

export default Footer;