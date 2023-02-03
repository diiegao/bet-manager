import { LitElement, html } from 'lit';
import { openDB } from 'idb';
import { Session } from '../../data/Session';
import { Styles } from './Styles';

export class AddNewHouse extends LitElement {

    constructor() {
        super();
        this.session = new Session();
    }

    static styles = Styles;

    async sendNewHouse(e) {
        const houseName = this.renderRoot.querySelector('.house-name').value;
        const houseBalance = this.renderRoot.querySelector('.house-balance').value;
        const userId = this.session.get();

        const db = await openDB('bets', 1);
        db.add('houses', { id: Date.now(), name: houseName, balance: Number(houseBalance), user: userId })
            .then(result => window.location.reload())
            .catch(console.log('error create new house'));
        db.close();
    }

    render() {
        return html`
            <h2>ADD NEW HOUSE</h2>
            <div class="content">
                <div class="box-input">
                    <span>Name</span>
                    <input type="text" class="house-name">
                    <span>Balance</span>
                    <input type="text" class="house-balance">
                </div>
                <button class="send-new-house" @click=${this.sendNewHouse}>Create</button>
            </div>
            `;
    }
}