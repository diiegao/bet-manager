import { LitElement, html, css } from 'lit';
import { Connect } from '../../data/Connect';
import { Session } from '../../data/Session';
import { Styles } from './Styles';

export class AccountBalance extends LitElement {

    static get properties() {
        return {
            houses: { type: Array },
            logs: { type: Array },
            totalBalance: { type: Number },
            countLogs: { type: Number },
        };
    }

    constructor() {
        super();
        this.db = new Connect();
        this.session = new Session();
        this.houses = [];
        this.logs = [];
        this.totalBalance = 0;
        this.countLogs = 0;
    }

    async connectedCallback() {
        super.connectedCallback();
        await this.db.getHousesByUser(this.session.get()).then(keys => this.houses = keys);
        await this.db.getLogsByUser(this.session.get(), 1, 9999).then(keys => this.logs = keys);
        await this.db.countLogs(this.session.get()).then(keys => this.countLogs = keys);
    }

    static styles = Styles;

    numberCurrency(number) {
        return number?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    addNewHouse(e) {
        const floatBox = document.createElement('float-box');
        floatBox.innerHTML = `<create-house></create-house>`;
        this.parentElement.appendChild(floatBox);
    }

    numberCurrency(number) {
        return number?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    sumHouseBalance(houseid, balance) {
        let result = balance;
        if (this.countLogs > 0) {
            this.logs.map(bet => {
                if (bet.user === this.session.get()) {
                    if (bet.house1 === houseid) {
                        if (bet.winner === 1) { // winner
                            let pnl = (bet.price1 * bet.odd1) - bet.price1;
                            return result = result + pnl;
                        } else if (bet.winner === 2) { // loser
                            return result = result - bet.price1;
                        }
                    } else if (bet.house2 === houseid) {
                        if (bet.winner === 1) { // loser
                            return result = result - bet.price2;
                        } else if (bet.winner === 2) { // winner
                            let pnl = (bet.price2 * bet.odd2) - bet.price2;
                            return result = result + pnl;
                        }
                    }
                }
            });
            this.totalBalance = this.totalBalance + result;
            return result;
        } else {
            return balance;
        }
    }

    getWinLose(houseid) {
        let result = {};
        let win = 0, lose = 0;
        if (this.countLogs > 0) {
            this.logs.map(bet => {
                if (bet.user === this.session.get()) {
                    if (bet.house1 === houseid) {
                        if (bet.winner === 1) { // winner
                            win++;
                            return result = { win, lose };
                        } else if (bet.winner === 2) { // loser
                            lose++;
                            return result = { win, lose };
                        }
                    } else if (bet.house2 === houseid) {
                        if (bet.winner === 1) { // loser
                            lose++;
                            return result = { win, lose };
                        } else if (bet.winner === 2) { // winner
                            win++;
                            return result = { win, lose };
                        }
                    }
                }
            });
            return result;
        }
    }

    render() {
        return html`
            <div class="header">
                <h2>My Balance</h2>
                <button class="create-new-house" @click=${this.addNewHouse} ?disabled=${!this.session.get()}>New House</button>
            </div>
            <div class="houses-balance">
                <div class="table-header">
                    <div class="info-house-name size">Name</div>
                    <div class="info-house-win size">Win</div>
                    <div class="info-house-lose size">Lose</div>
                    <div class="info-house-balance size">Balance</div>
                </div>
                ${this.houses.map(e => html`
                    <div class="house-box-content">
                        <div class="house-name size">${e.name}</div>
                        <div class="house-win size">${this.getWinLose(e.id)?.win === undefined ? 0 : this.getWinLose(e.id)?.win}</div>
                        <div class="house-lose size">${this.getWinLose(e.id)?.lose === undefined ? 0 : this.getWinLose(e.id)?.lose}</div>
                        <div class="house-balance size">${this.numberCurrency(this.sumHouseBalance(e.id, e.balance))}</div>
                    </div>`)}
                    <div class="house-box-content">
                        <div class="house-name">Total</div>
                        <div class="house-balance">${this.numberCurrency(this.totalBalance)}</div>
                    </div>
            </div>
        `;
    }
}
