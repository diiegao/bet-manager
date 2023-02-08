import { LitElement, html } from 'lit';
import { openDB } from 'idb';
import { Connect } from '../../data/Connect';
import { Session } from '../../data/Session';
import { Styles } from './Styles';
import { Colors } from '../../utils/Colors';

export class AddNewTransaction extends LitElement {

    static get properties() {
        return {
            houses: { type: Array }
        }
    }

    constructor() {
        super();
        this.db = new Connect();
        this.session = new Session();
        this.houses = [];
    }

    async connectedCallback() {
        super.connectedCallback();
        await this.db.getHousesByUser(this.session.get()).then(keys => this.houses = keys);
    }

    static styles = Styles;

    showMsg(el, msg) {
        const notification = this.renderRoot.querySelector('.notification');
        notification.setAttribute('style', 'padding: 5px');
        notification.innerHTML = msg;
        el.setAttribute('style', `border: 1px solid ${Colors.red1}`);
    }

    async sendNewTransaction(e) {
        let newHouse;
        const transactionHouse = this.renderRoot.querySelector('.user-houses');
        const transactionBalance = this.renderRoot.querySelector('.transaction-value');
        const transactionType = this.renderRoot.querySelector('.type-transaction:checked');
        const userId = this.session.get();

        if (transactionHouse.value === '') return this.showMsg(transactionHouse, 'Choose a house.');
        if (transactionBalance.value === '') return this.showMsg(transactionBalance, 'Select a balance.');
        if (transactionType.value === '') return this.showMsg(transactionType, 'Select a type.');

        const replaceBalance = transactionBalance.value.replace(',', '.');

        const fixHouse = Number(transactionHouse.value);
        const fixBalance = Number(replaceBalance);
        const fixType = Number(transactionType.value);


        this.houses.map(m => m.id === fixHouse ? newHouse = m : '');
        const newBalance = fixType === 0 ? Number(newHouse.balance + fixBalance) : Number(newHouse.balance - fixBalance);

        const db = await openDB('bets', 1);
        await db.put('houses', { id: fixHouse, name: newHouse.name, balance: newBalance, user: userId });
        await db.add('deposits', {
            id: Date.now(),
            date: Date.now(),
            houseid: fixHouse,
            housename: newHouse.name,
            type: fixType,
            value: fixBalance,
            user: userId
        });
        db.close();
        window.location.reload();
    }

    render() {
        return html`
            <h2>CREATE NEW TRANSACTION</h2>
            <div class="content">
                <div class="box-input">
                    <span>House</span>
                    <select name="houses" id="houses" class="user-houses">
                        ${this.houses.map(h => html`<option value="${h.id}">${h.name}</option>`)}
                    </select>
                    <span>Value</span>
                    <input type="text" class="transaction-value" placeholder="10,00">
                    <span>Transaction</span>
                    <div class="transactions-options">
                        <label for="type-deposit">
                            <input type="radio" name="type-transaction" id="type-deposit" class="type-transaction" value="0" checked>
                            <div class="transaction-button">Deposit</div>
                        </label>
                        <label for="type-withdraw">
                            <input type="radio" name="type-transaction" id="type-withdraw" class="type-transaction" value="1">
                            <div class="transaction-button">Withdraw</div>
                        </label>
                    </div>
                </div>
                <div class="notification"></div>
                <button class="send-new-transaction" @click=${this.sendNewTransaction}>New Transaction</button>
            </div>
            `;
    }
}