'use server';

import { google } from "googleapis";
import { InfisicalSDK } from "@infisical/sdk";

const client = new InfisicalSDK();

const env = (name: string): string => {
    if (process.env[name]) {
        return process.env[name]
    }
    throw new Error(`environment variable ${name} undefined.`)
}

const getData = async() => {
    let creds; 

    let headers: [] | null | undefined = [];

    let listing: [] | null | undefined = [];

    let filters: [] | null | undefined = [];

    let date: string | null = null; 

    await client.auth().accessToken(env('TOKEN'));

    await client.secrets().getSecret({
            environment: env('ENV'),
            projectId: env('PROJECT'),
            secretName: env('NAME')
    })
    .then(response => creds = JSON.parse(response.secretValue))
    .catch(()=> creds = null);

    const auth = await google.auth.getClient({
        projectId: env('SERVICEID'),
        credentials: creds,
        scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const sheets = google.sheets({ version: "v4", auth: auth });

    await sheets.spreadsheets.values.get({
        spreadsheetId: "1R-kMYTtOHVXYMEqlqde6K9bSVZ7T9klC-y9XhSd30x0",
        range: 'EMERGENCY NEEDS LIST!A:ZZ'
    })
    .then(success => 
        {
            const values = success.data.values;

            const categories = values?.map((e, i) => {
                    if (e.length === 1) {
                        return [i, e[0]]
                    } else return []
                }
            ).filter(ar => ar.length > 0).map((cat, index, array) => {return {category: cat[1].split(' (')[0], range: [cat[0] + 1, index + 1 < array.length ? array[index + 1][0] - 1 : values.length - 1]}});

            const final = values?.map((entries, index) => {
                if(entries.length > 1 && index !== 0 && entries[1].length > 0 && Number(entries[4]) > 0) {
                    return {
                        item: entries[1],
                        category: categories?.find(({category, range}) => index >= range[0] && index <= range[1])?.category,
                        need_count: entries[4], 
                        locations: entries[5].split(', ')
                    }
                } else {
                    return []
                }
            }).flat();

            headers = values[0].filter(e => e.length > 0).map(each => each.split(' (')[0]);
            listing = final;
            filters = categories?.map(each => each.category);
            const currentDate = new Date();
            const timeString = () => {
                const localeString = currentDate.toLocaleTimeString().split(':');
                return localeString[0] + ':' + localeString[1] + localeString[2].split(' ')[1]
            }

            date = currentDate.toLocaleDateString() + ", " + timeString();
        }
        
    )
    .catch((err) => console.log(err));

    return {headers: headers, listing: listing, filters: filters, last_updated: date};

}

export default getData;