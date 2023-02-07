import { openDB } from 'idb';

export class Connect {

    constructor() {
        this.createStorage();
    }

    async createStorage() {
        await openDB('bets', 1, {
            upgrade(db) {
                const users = db.createObjectStore('users', { keyPath: 'id' });
                users.createIndex('id', 'id');
                const logs = db.createObjectStore('logs', { keyPath: 'id' });
                logs.createIndex('id', 'id');
                const houses = db.createObjectStore('houses', { keyPath: 'id' });
                houses.createIndex('id', 'id');
                const deposits = db.createObjectStore('deposits', { keyPath: 'id' });
                deposits.createIndex('id', 'id');
            }
        });
    }

    async getHousesByUser(userid) {
        const db = await openDB('bets', 1);
        let store = db.transaction('houses').store;
        let cursor = await store.openCursor();
        // console.log(await db.getAllFromIndex('houses', 'id'));

        const list = [];
        while (cursor) {
            const user = cursor.value.user;

            user === userid ? list.push(cursor.value) : '';

            cursor = await cursor.continue();
            // if (!cursor) break;
        }

        db.close();

        return list;
    }

    async getDepositsByUser(userid, page = 1, limit = 10) {
        const db = await openDB('bets', 1);
        let store = db.transaction('deposits').store;
        let cursor = await store.openCursor();

        let logs = [];
        while (cursor) {
            const user = Number(cursor.value.user);

            if (user === Number(userid)) {
                logs.push(cursor.value);
            }

            cursor = await cursor.continue();
        }

        db.close();

        logs.sort((a, b) => new Date(b.date) - new Date(a.date));
        let startIndex = (page - 1) * limit;
        let endIndex = startIndex + limit;

        return logs.slice(startIndex, endIndex);
    }

    async getHouseByID(houseid) {
        const db = await openDB('bets', 1);
        const result = await db.getFromIndex('houses', 'id', houseid);
        db.close();
        return result;
    }

    async removeByID(store, id) {
        const db = await openDB('bets', 1);
        const result = await db.delete(store, id);
        db.close();
        return result;
    }

    async countHouses(userid) {
        const db = await openDB('bets', 1);
        let store = db.transaction('houses').store;
        let cursor = await store.openCursor();

        let count = 0;
        while (cursor) {
            const user = Number(cursor.value.user);

            if (user === Number(userid)) {
                count++;
            }

            cursor = await cursor.continue();
        }

        db.close();

        return count;
    }

    async countLogs(userid) {
        const db = await openDB('bets', 1);
        let store = db.transaction('logs').store;
        let cursor = await store.openCursor();

        let count = 0;
        while (cursor) {
            const user = Number(cursor.value.user);

            if (user === Number(userid)) {
                count++;
            }

            cursor = await cursor.continue();
        }

        db.close();

        return count;
    }

    async countDeposits(userid) {
        const db = await openDB('bets', 1);
        let store = db.transaction('deposits').store;
        let cursor = await store.openCursor();

        let count = 0;
        while (cursor) {
            const user = Number(cursor.value.user);

            if (user === Number(userid)) {
                count++;
            }

            cursor = await cursor.continue();
        }

        db.close();

        return count;
    }

    async getLogsByUser(userid, page = 1, limit = 50) {
        const db = await openDB('bets', 1);
        let store = db.transaction('logs').store;
        let cursor = await store.openCursor();

        let logs = [];
        while (cursor) {
            const user = Number(cursor.value.user);

            if (user === Number(userid)) {
                logs.push(cursor.value);
            }

            cursor = await cursor.continue();
        }

        db.close();

        logs.sort((a, b) => new Date(b.date) - new Date(a.date));
        let startIndex = (page - 1) * limit;
        let endIndex = startIndex + limit;

        return logs.slice(startIndex, endIndex);
    }

    async getLogById(userid, id) {
        const db = await openDB('bets', 1);
        let store = db.transaction('logs').store;
        let cursor = await store.openCursor();

        let result;
        while (cursor) {
            const user = Number(cursor.value.user);
            const logid = Number(cursor.value.id);

            if (user === Number(userid) && logid === Number(id)) {
                result = cursor.value;
                break;
            } else {
                await cursor.continue();
            }

            // if (!cursor) break;
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
        while (cursor) {
            const logid = Number(cursor.value.id);

            if (logid === Number(userid)) {
                result = cursor.value;
                break;
            } else {
                await cursor.continue();
            }

            // if (!cursor) break;
        }

        db.close();

        return result;
    }

};