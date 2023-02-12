import { LitElement, html } from 'lit';
import { openDB } from 'idb';
import { Connect } from '../../data/Connect';
import { Session } from '../../data/Session';
import { Styles } from './Styles';

export class BackupBets extends LitElement {

    static get properties() {
        return {
            users: { type: Array }
        }
    }

    constructor() {
        super();
        this.db = new Connect();
        this.session = new Session();
        this.users = undefined;
    }

    async connectedCallback() {
        super.connectedCallback();
        this.users = await this.db.getUserById(this.session.get());
    }

    static styles = Styles;

    async exportDB() {
        const storesName = ['deposits', 'houses', 'users', 'logs'];
        let storesData = [];

        const db = await openDB('bets', 1);
        for (let i = 0; i < storesName.length; i++) {

            let storeData = [];
            const tx = db.transaction(storesName[i], 'readonly').store;
            const date = await tx.getAll();

            for (let c = 0; c < date.length; c++) {
                storeData.push(date[c]);
            }

            storesData[storesName[i]] = storeData;

        }

        db.close();


        const jsonData = JSON.stringify({ ...storesData });
        const today = new Date();
        const nameBck = `${this.users.name}-backup-${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}.json`;
        this.download(jsonData, nameBck, 'application/json');
    }

    async importDB() {
        let resultDeposits = false, resultLogs = false, resultHouses = false, resultUser = false;
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.addEventListener('change', async (event) => {
            const file = event.target.files[0];
            const json = await file.text();
            const data = [];
            data.push(JSON.parse(json));

            const db = await openDB('bets', 1);
            data.forEach(storageName => {
                storageName.users.map(user => {
                    db.put('users', { id: Number(user.id), name: user.name })
                        .then(result => resultUser = true)
                        .catch(err => console.error(err));
                });

                storageName.houses.map(house => {
                    db.put('houses', { id: Number(house.id), name: house.name, balance: Number(house.balance), user: Number(house.user) })
                        .then(result => resultHouses = true)
                        .catch(err => console.error(err));
                })

                storageName.deposits.map(deposit => {
                    db.put('deposits', {
                        id: Number(deposit.id),
                        date: Number(deposit.date),
                        houseid: Number(deposit.houseid),
                        housename: deposit.housename,
                        type: Number(deposit.type),
                        value: Number(deposit.value),
                        user: Number(deposit.user)
                    })
                        .then(result => resultDeposits = true)
                        .catch(err => console.error(err));
                })

                storageName.logs.map(log => {
                    db.put('logs', {
                        id: Number(log.id),
                        house1: Number(log.house1),
                        house2: Number(log.house2),
                        odd1: Number(log.odd1),
                        odd2: Number(log.odd2),
                        price1: Number(log.price1),
                        price2: Number(log.price2),
                        date: Number(log.id),
                        winner: Number(log.winner),
                        user: Number(log.user)
                    })
                        .then(result => resultLogs = true)
                        .catch(err => console.error(err));
                })

                db.close();

            });
            if (resultUser === true && resultHouses === true && resultDeposits === true && resultLogs === true) {
                window.location.reload();
            }
        });

        input.click();

    }

    download(data, filename, type) {
        let file = new Blob([data], { type: type });
        if (window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(file, filename);
        } else {
            let a = document.createElement("a"),
                url = URL.createObjectURL(file);
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            setTimeout(function () {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            }, 0);
        }
    }


    render() {
        return html`
            ${console.log()}
            <button class="button export" @click=${this.exportDB} ?disabled=${!this.session.get()}>Export Backup</button>
            <button class="button import" @click=${this.importDB}>Import Backup</button>
            `;
    }
}