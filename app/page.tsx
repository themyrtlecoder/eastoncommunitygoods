'use client';

import styles from "./styles/page.module.scss";
import Navigation from "./microcomps/front/navigation";
import Footer from "./microcomps/front/footer";
import getData from "./microcomps/back/google";
import { useEffect, useTransition } from "react";
import { useProvider } from "./microcomps/front/provider";

const Index = () => {

  const[pending, startTransition] = useTransition();

  const {setListing, headers, list, search, filter} = useProvider();

  const preferredHeaders = ['ITEM', 'AMOUNT NEEDED', 'DROP-OFF LOCATIONS'];

  useEffect(() => {
    startTransition(async() => {
      const {headers, listing, filters, last_updated} = await getData();

      const localeString = last_updated.toLocaleTimeString("en-US").split(':');
      const timeString = localeString[0] + ':' + localeString[1] + localeString[2].split(' ')[1];
      const dateString = `${last_updated.toLocaleDateString("en-US")}, ${timeString}`

      setListing({headers: headers.filter((header) => preferredHeaders.includes(header)), list: listing, categories: filters, update: dateString});
    })
  }, []);

  const responsiveList = (list: any[]) => {
    return list.filter((listed) => listed.item.includes(search) && (filter.length > 0 ? filter.find(match => match === listed.category) : listed))
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Navigation pending={pending}/>
        <section className={styles.emergency_needs_list}>
          <ul>
            <ul className={styles.headers}>{headers.map((header: string, headerI: number) => <li key={header+headerI}><h2>{header}</h2></li>)}</ul>
            {pending ? 
            
              <h4 className={styles.no_needs}>please wait while the list loads</h4> : 

              (list.length > 0 && responsiveList(list).length !== 0) ? responsiveList(list).map(({item, need_count, locations}:{item: string; need_count: string | number; locations: string[]}, index: number) => <li key={item + index}>
              <ul className={styles.list_of_details}>
                <li className={styles.item}>{item}</li>
                <li className={styles.need_count}>{need_count}</li>
                <li>
                  <ul>
                    <li>
                      {locations.map((location: string, lIndex: number) => <a key={item + index + location}><sup>{lIndex + 1}</sup> {location}</a>)}
                    </li>
                  </ul>
                </li>
              </ul>
            </li>) : <h4 className={styles.no_needs}>no needs found</h4>}
          </ul>
        </section>
        <Footer/>
      </main>
    </div>
  );
}

export default Index
