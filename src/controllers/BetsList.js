import { openDB } from "idb";

export function createBetList() {
    openDB('bets', 1, {
        upgrade(db) {
            db.createObjectStore('logs', { keyPath: 'id' });
            db.createObjectStore('houses', { keyPath: 'id' });
            db.createObjectStore('users', { keyPath: 'id' });
        }
    });
}

export async function insertBet() {
    // console.log(Date.now());
    // const timeTeste = new Date(1675099014907);
    // console.log(timeTeste.toLocaleString('pt-BR'));
    // const id = Date.now();
    // const getDate = new Date(id);
    // const data = getDate.toLocaleString('pt-BR');

    const db = await openDB('bets', 1);
    const tx = db.transaction('users', 'readwrite');
    const store = tx.objectStore('users');

    // store.put({
    //     id: 1675115208369,
    //     house1: 1675115294680,
    //     house2: 1675115273808,
    //     odd1: 3.25,
    //     odd2: 1.53,
    //     price1: 32,
    //     price2: 68,
    //     date: 1675115208369,
    //     winner: 2,
    //     user: 1675280062731
    // });
    // store.put({
    //     id: 1675115213897,
    //     house1: 1675115294680,
    //     house2: 1675115273808,
    //     odd1: 3.5,
    //     odd2: 1.5,
    //     price1: 30,
    //     price2: 70,
    //     date: 1675115213897,
    //     winner: 2,
    //     user: 1675280062731
    // });
    // store.put({
    //     id: 1675115215167,
    //     house1: 1675115294680,
    //     house2: 1675115273808,
    //     odd1: 1.825,
    //     odd2: 2.6,
    //     price1: 59,
    //     price2: 41,
    //     date: 1675115215167,
    //     winner: 1,
    //     user: 1675280062731
    // })
    // store.put({
    //     id: 1675115216512,
    //     house1: 1675115294680,
    //     house2: 1675115273808,
    //     odd1: 2.37,
    //     odd2: 1.87,
    //     price1: 44,
    //     price2: 56,
    //     date: 1675115216512,
    //     winner: 1,
    //     user: 1675280062731
    // })
    // store.put({
    //     id: 1675115217507,
    //     house1: 1675115285956,
    //     house2: 1675115273808,
    //     odd1: 2.09,
    //     odd2: 2.07,
    //     price1: 150,
    //     price2: 150,
    //     date: 1675115217507,
    //     winner: 2,
    //     user: 1675280062731
    // })

    // store.add({
    //     id: 1675172779967,
    //     house1: 1675115294680,
    //     house2: 1675115273808,
    //     odd1: 0,
    //     odd2: 1.5,
    //     price1: 0,
    //     price2: 70,
    //     date: 1675172779967,
    //     winner: 2,
    //     user: 1675280062731
    // });

    store.add({
        id: Date.now(),
        name: 'Sung Jin Woo'
    });

    // store.add({
    //     id: 1675115273808,
    //     name: "Betano",
    //     balance: 1500,
    //     user: 1675280062731
    // });

    // store.add({
    //     id: 1675115285956,
    //     name: "Pinnacle",
    //     balance: 1500,
    //     user: 1675280062731
    // });

    // store.add({
    //     id: 1675115290347,
    //     name: "Betsson",
    //     balance: 1500,
    //     user: 1675280062731
    // });

    // store.add({
    //     id: 1675115294680,
    //     name: "Bet365",
    //     balance: 1500,
    //     user: 1675280062731
    // });

    await tx.done;

    db.close();
}

// export async function insertTwoBet() {
//     const db = await openDB('bets', 1);
//     const tx = db.transaction('logs', 'readwrite');
//     const store = tx.objectStore('logs');

//     let newId = 0;
//     const lastKey = await store.getKey(store.count - 1);
//     if (lastKey !== undefined) {
//         newId = lastKey + 1;
//     }

//     store.add({
//         id: newId,
//         house1: 1,
//         house2: 2,
//         odd1: 2.905,
//         odd2: 1.402,
//         price1: 1500,
//         price2: 1500,
//         date: Date.now(),
//         winner: 1
//     });
//     store.add({
//         id: newId,
//         house1: 1,
//         house2: 2,
//         odd1: 2.905,
//         odd2: 1.402,
//         price1: 1500,
//         price2: 1500,
//         date: Date.now(),
//         winner: 1
//     });
//     store.add({
//         id: newId,
//         house1: 1,
//         house2: 2,
//         odd1: 2.905,
//         odd2: 1.402,
//         price1: 1500,
//         price2: 1500,
//         date: Date.now(),
//         winner: 1
//     });
//     store.add({
//         id: newId,
//         house1: 1,
//         house2: 2,
//         odd1: 2.905,
//         odd2: 1.402,
//         price1: 1500,
//         price2: 1500,
//         date: Date.now(),
//         winner: 1
//     });
//     store.add({
//         id: newId,
//         house1: 1,
//         house2: 2,
//         odd1: 2.905,
//         odd2: 1.402,
//         price1: 1500,
//         price2: 1500,
//         date: Date.now(),
//         winner: 1
//     });
//     db.close();
// }

export async function insertHouse() {
    const db = await openDB('bets', 1);
    const id = Date.now();
    // db.add('houses', { id, name: 'Betano', balance: 1500 });
    // db.add('houses', { id, name: 'Pinnacle', balance: 1500 });
    // db.add('houses', { id, name: 'Betsson', balance: 1500 });
    // db.add('houses', { id, name: 'Bet365', balance: 1500 });
    db.close();
}

export async function newId(data) {
    const db = await openDB('bets', 1);
    const tx = db.transaction(data, 'readwrite');
    const store = tx.objectStore(data);

    let newId = 0;
    const lastKey = await store.getKey(store.count - 1);
    if (lastKey !== undefined) {
        newId = lastKey + 1;
    }

    db.close();
    return newId;
}

export async function getBet() {
    const db = await openDB('bets', 1);
    const result = db.getAllKeys('logs');
    db.close();
    return result;
}
