import { LitElement, html } from 'lit';
// import { openDB } from 'idb';
import { Styles } from './Styles';

export class NewBetAndLog extends LitElement {

    constructor() {
        super();
    }

    static styles = Styles;

    // async sendNewUser(e) {
    //     const getUser = this.renderRoot.querySelector('.user-name').value;

    //     const db = await openDB('bets', 1);
    //     db.add('users', { id: Date.now(), name: getUser })
    //         .then(result => window.location.reload())
    //         .catch(console.log('error create new user'));
    //     db.close();
    // }

    addNewHouse(e) {
        const floatBox = document.createElement('float-box');
        floatBox.innerHTML = `<create-house></create-house>`;
        this.parentElement.appendChild(floatBox);
    }

    addNewBet(e) {
        const floatBox = document.createElement('float-box');
        floatBox.innerHTML = `<create-bet></create-bet>`;
        this.parentElement.appendChild(floatBox);
    }

    render() {
        return html`
            <button class="create-new-log" @click=${this.addNewBet}>Add New Log</button>
            <button class="create-new-house" @click=${this.addNewHouse}>Add New House</button>
            `;
    }
}