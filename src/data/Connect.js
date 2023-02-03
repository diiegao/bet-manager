import { openDB } from 'idb';

export class Connect {

    constructor() {
        this.createStorage();
    }

    async createStorage() {
        await openDB('bets', 1, {
            upgrade(db, oldVersion, newVersion) {
                console.log(oldVersion, newVersion);
                db.createObjectStore('users', { keyPath: 'id' });
                db.createObjectStore('logs', { keyPath: 'id' });
                db.createObjectStore('houses', { keyPath: 'id' });
                db.createObjectStore('deposits', { keyPath: 'id' });
            }
        });
    }

    async getHousesByUser(userid) {
        const db = await openDB('bets', 1);
        let store = db.transaction('houses').store;
        let cursor = await store.openCursor();

        const list = [];
        while (true) {
            const user = cursor.value.user;

            user === userid ? list.push(cursor.value) : '';

            cursor = await cursor.continue();
            if (!cursor) break;
        }

        db.close();

        return list;
    }

    async getLogsByUser(userid) {
        const db = await openDB('bets', 1);
        let store = db.transaction('logs').store;
        let cursor = await store.openCursor();

        const list = [];
        while (true) {
            const user = Number(cursor.value.user);

            user === Number(userid) ? list.push(cursor.value) : '';

            cursor = await cursor.continue();
            if (!cursor) break;
        }

        db.close();

        return list;
    }

    async getLogById(userid, id) {
        const db = await openDB('bets', 1);
        let store = db.transaction('logs').store;
        let cursor = await store.openCursor();

        let result;
        while (true) {
            const user = Number(cursor.value.user);
            const logid = Number(cursor.value.id);

            if (user === Number(userid) && logid === Number(id)) {
                result = cursor.value;
                break;
            } else {
                await cursor.continue();
            }

            if (!cursor) break;
        }

        db.close();

        return result;
    }

    async getUsers() {
        const db = await openDB('bets', 1);
        const result = db.getAll('users');
        db.close();
        return result;
    }

    async getUserById(userid) {
        const db = await openDB('bets', 1);
        let store = db.transaction('users').store;
        let cursor = await store.openCursor();

        let result;
        while (true) {
            const logid = Number(cursor.value.id);

            if (logid === Number(userid)) {
                result = cursor.value;
                break;
            } else {
                await cursor.continue();
            }

            if (!cursor) break;
        }

        db.close();

        return result;
    }

};