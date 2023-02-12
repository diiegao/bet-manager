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
            realBalance: { type: Number },
            newBalance: { type: Array },
            removeButton: { type: Boolean }
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
        this.realBalance = 0;
        this.newBalance = [];
        this.removeButton = false;
    }

    async connectedCallback() {
        super.connectedCallback();
        await this.db.getHousesByUser(this.session.get()).then(keys => this.houses = keys);
        await this.db.getLogsByUser(this.session.get(), 1, 9999).then(keys => this.logs = keys);
        await this.db.countLogs(this.session.get()).then(keys => this.countLogs = keys);
        // const teste = await this.db.removeByID('logs', 1675435693379);
        this.houses.map(house => {
            this.totalBalance += house.balance;
            this.realBalance += house.balance;

            if (this.countLogs > 0 && this.logs != undefined) {

                this.logs.map(bet => {

                    if (bet.house1 === house.id) {

                        if (bet.winner === 1) {
                            let pnl = (bet.price1 * bet.odd1) - bet.price1;
                            this.totalBalance += pnl;
                            return this.newBalance.push({ id: house.id, bet: bet.id, win: pnl, lose: 0 });
                        }

                        if (bet.winner === 2) {
                            this.totalBalance -= bet.price1;
                            return this.newBalance.push({ id: house.id, bet: bet.id, win: 0, lose: bet.price1 });
                        }

                        if (bet.winner === 3) {
                            if (bet.price1 > 0) {
                                this.totalBalance += bet.price1;
                                return this.newBalance.push({ id: house.id, bet: bet.id, win: bet.price1, lose: 0 });
                            }

                            if (bet.price1 < 0) {
                                const losePrice = String(bet.price1).replace('-', '');
                                this.totalBalance -= Number(losePrice);
                                return this.newBalance.push({ id: house.id, bet: bet.id, win: 0, lose: Number(losePrice) });
                            }
                        }

                        if (bet.winner === 4) {
                            if (bet.price1 > 0) {
                                this.totalBalance += bet.price1;
                                return this.newBalance.push({ id: house.id, bet: bet.id, win: bet.price1, lose: 0 });
                            }

                            if (bet.price1 < 0) {
                                const losePrice = String(bet.price1).replace('-', '');
                                this.totalBalance -= Number(losePrice);
                                return this.newBalance.push({ id: house.id, bet: bet.id, win: 0, lose: Number(losePrice) });
                            }
                        }

                    }

                    if (bet.house2 === house.id) {

                        if (bet.winner === 1) {
                            this.totalBalance -= bet.price2;
                            return this.newBalance.push({ id: house.id, bet: bet.id, win: 0, lose: bet.price2 });
                        }

                        if (bet.winner === 2) {
                            let pnl = (bet.price2 * bet.odd2) - bet.price2;
                            this.totalBalance += pnl;
                            return this.newBalance.push({ id: house.id, bet: bet.id, win: pnl, lose: 0 });
                        }

                        if (bet.winner === 3) {
                            if (bet.price2 > 0) {
                                this.totalBalance += bet.price2;
                                return this.newBalance.push({ id: house.id, bet: bet.id, win: bet.price2, lose: 0 });
                            }

                            if (bet.price2 < 0) {
                                const losePrice = String(bet.price2).replace('-', '');
                                this.totalBalance -= Number(losePrice);
                                return this.newBalance.push({ id: house.id, bet: bet.id, win: 0, lose: Number(losePrice) });
                            }
                        }

                        if (bet.winner === 4) {
                            if (bet.price2 > 0) {
                                this.totalBalance += bet.price2;
                                return this.newBalance.push({ id: house.id, bet: bet.id, win: bet.price2, lose: 0 });
                            }

                            if (bet.price2 < 0) {
                                const losePrice = String(bet.price2).replace('-', '');
                                this.totalBalance -= Number(losePrice);
                                return this.newBalance.push({ id: house.id, bet: bet.id, win: 0, lose: Number(losePrice) });
                            }
                        }

                    }
                });
            }
        });
        console.log(this.newBalance);
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

    toggleRemove(e) {
        return this.removeButton = !this.removeButton;
    }

    render() {
        return html`
            <div class="header">
                <h2>My Balance</h2>
                <div class="buttons">
                    <button class="show-button-remove" @click=${this.toggleRemove} ?disabled=${!this.session.get()}><img src="images/bin.png" alt="Remove House" width="18" height="18"></button>
                    <button class="create-new-house" @click=${this.addNewHouse} ?disabled=${!this.session.get()}>New House</button>
                </div>
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
                        <div class="house-balance size">
                        ${this.numberCurrency(this.newBalance.reduce((acc, cur) => {
            if (cur.id === e.id) {
                if (cur.win > 0) {
                    acc += cur.win;
                } else if (cur.lose > 0) {
                    acc -= cur.lose;
                }
            }
            return acc;
        }, e.balance))}
                        </div>
                        <div class="remove-icon" ?hidden=${!this.removeButton}>
                            <button class="remove-house">x</button>
                        </div>
                    </div>`)}
                    <div class="house-box-content">
                        <div class="house-name">Total</div>
                        <div class="house-balance">${this.numberCurrency(this.totalBalance)}</div>
                    </div>
                    <div class="house-box-content">
                        <div class="house-name">PNL</div>
                        <div class="house-balance">${this.numberCurrency((this.totalBalance - this.realBalance))} (${(((this.totalBalance - this.realBalance) / this.realBalance) * 100).toFixed(2) || 0}%)</div>
                    </div>
            </div>
        `;
    }
}
