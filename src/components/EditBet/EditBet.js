import { LitElement, html } from 'lit';
import { Connect } from '../../data/Connect';
import { Session } from '../../data/Session';
import { openDB } from 'idb';
import { Styles } from './Styles';

export class EditBet extends LitElement {

    static get properties() {
        return {
            bet: { type: Number },
            houses: { type: Array },
            logs: { type: Object }
        }
    }

    constructor() {
        super();
        this.db = new Connect();
        this.session = new Session();
        this.houses = [];
        this.logs = {};
    }

    connectedCallback() {
        super.connectedCallback();
        this.db.getLogById(this.session.get(), this.bet).then(keys => this.logs = keys);
        this.db.getHousesByUser(this.session.get()).then(keys => this.houses = keys);
        // this.getBetLogs().then(keys => this.logs = keys);
        // this.getBetHouses().then(keys => this.houses = keys);
    }

    static styles = Styles;

    // async getBetHouses() {
    //     // const userId = this.session.get();
    //     const db = await openDB('bets', 1);
    //     const tx = db.transaction('houses');
    //     const store = tx.objectStore('houses');
    //     const result = store.getAll();
    //     await tx.done;
    //     return result;
    // }

    // async getBetLogs() {
    //     const db = await openDB('bets', 1);
    //     const tx = db.transaction('logs', 'readwrite');
    //     const store = tx.objectStore('logs');
    //     const result = store.get(this.bet);
    //     await tx.done;
    //     return result;
    // }

    async edit(e) {
        // console.log(this.shadowRoot.querySelector('.select-house-1').value);
        const db = await openDB('bets', 1);
        const tx = db.transaction('logs', 'readwrite');
        const store = tx.objectStore('logs');
        store.put({
            id: Number(this.bet),
            house1: Number(this.renderRoot.querySelector('.select-house-1').value),
            house2: Number(this.renderRoot.querySelector('.select-house-2').value),
            odd1: Number(this.renderRoot.querySelector('.odd-house-1').value),
            odd2: Number(this.renderRoot.querySelector('.odd-house-2').value),
            price1: Number(this.renderRoot.querySelector('.price-house-1').value),
            price2: Number(this.renderRoot.querySelector('.price-house-2').value),
            date: Number(this.bet),
            winner: Number(this.renderRoot.querySelector('.bet-status-option:checked').value),
            user: this.session.get()
        });
        await tx.done;

        db.close();

        tx.done ? window.location.reload() : console.log('Error on update bet.');
    }

    render() {
        // console.log(this.getBetHouses());
        return html`
        <div class="edit-content">
            <h2>Edit BET</h2>
            <div class="houses-edit">
                <div class="edit-house-1">
                    <span>House 1</span>
                    <select name="houses-1" id="houses-1" class="select-house-1">
                        ${this.houses.map(h => html`<option value="${h.id}" ?selected=${h.id === this.logs.house1 ? 'selected' : ''}>${h.name}</option>`)}
                    </select>
                    <span>Bet</span>
                    <div style="display: flex; align-items: center; justify-content: center;">
                        <input type="text" name="price1" class="price-house-1" value="${this.logs.price1}">
                        <span style="padding: 0 5px 5px 0;">@</span>
                        <input type="text" name="odd1" class="odd-house-1" value="${this.logs.odd1}">
                    </div>
                </div>
                <div class="edit-house-2">
                    <span>House 2</span>
                    <select name="houses-2" id="houses-2" class="select-house-2">
                        ${this.houses.map(h => html`<option value="${h.id}" ?selected=${h.id === this.logs.house2 ? 'selected' : ''}>${h.name}</option>`)}
                    </select>
                    <span>Bet</span>
                    <div style="display: flex; align-items: center; justify-content: center;">
                        <input type="text" name="price2" class="price-house-2" value="${this.logs.price2}">
                        <span style="padding: 0 5px 5px 0;">@</span>
                        <input type="text" name="odd2" class="odd-house-2" value="${this.logs.odd2}">
                    </div>
                </div>
            </div>
            <span>Status</span>
        <div class="bet-status-edit">
            <label for="waiting">
                <input type="radio" id="waiting" name="house-status" class="bet-status-option" value="0" ?checked=${this.logs.winner === 0 ? 'checked' : ''}>
                <div class="bet-status-button button-waiting">
                    Waiting
                </div>
            </label>
            <label for="house-1">
                <input type="radio" id="house-1" name="house-status" class="bet-status-option" value="1" ?checked=${this.logs.winner === 1 ? 'checked' : ''}>
                <div class="bet-status-button button-winner">
                    House 1 Won
                </div>
            </label>
            <label for="house-2">
                <input type="radio" id="house-2" name="house-status" class="bet-status-option" value="2" ?checked=${this.logs.winner === 2 ? 'checked' : ''}>
                <div class="bet-status-button button-winner">
                    House 2 Won
                </div>
            </label>
            <label for="draw">
                <input type="radio" id="draw" name="house-status" class="bet-status-option" value="3" ?checked=${this.logs.winner === 3 ? 'checked' : ''}>
                <div class="bet-status-button button-draw">
                    Draw
                </div>
            </label>
        </div>
            <button @click=${this.edit} class="send-edit-bet">Send</button>
        </div>
        
        `;
    }
}