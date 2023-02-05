import { LitElement, html } from 'lit';
import { Connect } from '../../data/Connect';
import { Session } from '../../data/Session';
import { openDB } from 'idb';
import { Styles } from './Styles';
import { Colors } from '../../utils/Colors';

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

    showMsg(el, msg) {
        const notification = this.renderRoot.querySelector('.notification');
        notification.setAttribute('style', 'padding: 5px');
        notification.innerHTML = msg;
        el.setAttribute('style', `border: 1px solid ${Colors.red1}`);
    }

    async edit(e) {
        const notification = this.renderRoot.querySelector('.notification');
        const elHouse1 = this.renderRoot.querySelector('.select-house-1');
        const elHouse2 = this.renderRoot.querySelector('.select-house-2');
        const elOdd1 = this.renderRoot.querySelector('.odd-house-1');
        const elOdd2 = this.renderRoot.querySelector('.odd-house-2');
        const elPrice1 = this.renderRoot.querySelector('.price-house-1');
        const elPrice2 = this.renderRoot.querySelector('.price-house-2');
        const elStatus = this.renderRoot.querySelector('.bet-status-option:checked');
        const getUser = this.session.get();

        if (elHouse1.value === '') return this.showMsg(elHouse1, 'Please select a House1.');
        if (elHouse2.value === '') return this.showMsg(elHouse2, 'Please select a House2.');
        if (elHouse1.value === elHouse2.value || elHouse2.value === elHouse1.value) return this.showMsg(elHouse1, 'The houses cannot be the same.');
        if (elPrice1.value === '') return this.showMsg(elPrice1, 'Please select a Price1.');
        if (elPrice2.value === '') return this.showMsg(elPrice2, 'Please select a Price2.');
        if (elOdd1.value === '') return this.showMsg(elOdd1, 'Please select a Odd1.');
        if (elOdd2.value === '') return this.showMsg(elOdd2, 'Please select a Odd2.');
        if (!getUser) return notification.innerHTML = 'Select a profile';

        const fixHouse1 = Number(elHouse1.value);
        const fixHouse2 = Number(elHouse2.value);
        const fixOdd1 = Number(elOdd1.value.replace(',', '.'));
        const fixOdd2 = Number(elOdd2.value.replace(',', '.'));
        const fixPrice1 = Number(elPrice1.value);
        const fixPrice2 = Number(elPrice2.value);
        const fixStatus = Number(elStatus.value);

        // console.log(this.shadowRoot.querySelector('.select-house-1').value);
        const db = await openDB('bets', 1);
        const tx = db.transaction('logs', 'readwrite');
        const store = tx.objectStore('logs');
        store.put({
            id: Number(this.bet),
            house1: fixHouse1,
            house2: fixHouse2,
            odd1: fixOdd1,
            odd2: fixOdd2,
            price1: fixPrice1,
            price2: fixPrice2,
            date: Number(this.bet),
            winner: fixStatus,
            user: getUser
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
            <div class="notification"></div>
            <button @click=${this.edit} class="send-edit-bet">Send</button>
        </div>
        
        `;
    }
}