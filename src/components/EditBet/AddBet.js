import { LitElement, html } from 'lit';
import { openDB } from 'idb';
import { Connect } from '../../data/Connect';
import { Session } from '../../data/Session';
import { Styles } from './Styles';

export class AddNewBet extends LitElement {

    static get properties() {
        return {
            houses: { type: Array },
        }
    }

    constructor() {
        super();
        this.db = new Connect()
        this.session = new Session();
        this.houses = [];
    }

    connectedCallback() {
        super.connectedCallback();
        this.db.getHousesByUser(this.session.get()).then(keys => this.houses = keys);
    }

    static styles = Styles;

    async sendNewBet(e) {
        const betObj = {
            id: Number(Date.now()),
            house1: Number(this.renderRoot.querySelector('.select-house-1').value),
            house2: Number(this.renderRoot.querySelector('.select-house-2').value),
            odd1: Number(this.renderRoot.querySelector('.odd-house-1').value),
            odd2: Number(this.renderRoot.querySelector('.odd-house-2').value),
            price1: Number(this.renderRoot.querySelector('.price-house-1').value),
            price2: Number(this.renderRoot.querySelector('.price-house-2').value),
            date: Number(Date.now()),
            winner: Number(0),
            user: this.session.get()
        };

        const db = await openDB('bets', 1);
        db.add('logs', betObj)
            .then(result => window.location.reload())
            .catch(console.log('error create new house'));
        db.close();
    }

    render() {
        return html`
            <div class="edit-content">
            <h2>ADD NEW BET</h2>
            <div class="houses-edit">
                <div class="edit-house-1">
                    <span>House 1</span>
                    <select name="houses-1" id="houses-1" class="select-house-1">
                        ${this.houses.map(h => html`<option value="${h.id}">${h.name}</option>`)}
                    </select>
                    <span>Bet</span>
                    <div style="display: flex; align-items: center; justify-content: center;">
                        <input type="text" name="price1" class="price-house-1">
                        <span style="padding: 0 5px 5px 0;">@</span>
                        <input type="text" name="odd1" class="odd-house-1">
                    </div>
                </div>
                <div class="edit-house-2">
                    <span>House 2</span>
                    <select name="houses-2" id="houses-2" class="select-house-2">
                        ${this.houses.map(h => html`<option value="${h.id}">${h.name}</option>`)}
                    </select>
                    <span>Bet</span>
                    <div style="display: flex; align-items: center; justify-content: center;">
                        <input type="text" name="price2" class="price-house-2">
                        <span style="padding: 0 5px 5px 0;">@</span>
                        <input type="text" name="odd2" class="odd-house-2">
                    </div>
                </div>
            </div>
            <button class="send-edit-bet" @click=${this.sendNewBet}>Create</button>
        </div>
            `;
    }
}