import { LitElement, html, css } from 'lit';
import { Connect } from '../../data/Connect';
import { Session } from '../../data/Session';
// import { openDB } from 'idb';
import { Styles } from './Styles';

export class BetsList extends LitElement {

    static get properties() {
        return {
            bet: { type: Number },
            logs: { type: Object },
            houses: { type: Array }
        }
    }

    constructor() {
        super();
        this.db = new Connect();
        this.session = new Session();
        this.logs = {};
        this.houses = [];
    }

    connectedCallback() {
        super.connectedCallback();
        this.logs = this.db.getLogById(this.session.get(), this.bet).then(keys => this.logs = keys);
        this.db.getHousesByUser(this.session.get()).then(keys => this.houses = keys);
    }

    static styles = Styles;

    // async getBetLogs() {
    //     const db = await openDB('bets', 1);
    //     const tx = db.transaction('logs', 'readwrite');
    //     const store = tx.objectStore('logs');
    //     const result = store.get(this.bet);
    //     await tx.done;
    //     return result;
    // }

    // async getBetHouses() {
    //     const db = await openDB('bets', 1);
    //     const tx = db.transaction('houses', 'readwrite');
    //     const store = tx.objectStore('houses');
    //     const result = store.getAll();
    //     await tx.done;
    //     return result;
    // }

    convertDate(num) {
        const date = new Date(num);
        const newDate = date.toLocaleString('pt-BR');
        return newDate;
    }

    colorWin(winner, type, house) {
        const borderColor = winner !== 0 && winner === house ? 'bet-house-winner' : winner !== 0 && winner === 3 ? 'bet-house-draw' : winner !== 0 ? 'bet-house-loser' : '';
        const fontColor = winner !== 0 && winner === house ? 'bet-winner' : winner !== 0 && winner === 3 ? 'bet-draw' : winner !== 0 ? 'bet-loser' : '';
        return type === 0 ? borderColor : fontColor;
    }

    numberCurrency(number) {
        return number.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    calcPNL() {
        const houseWon = this.logs.winner === 1 ? this.logs.price1 :
            this.logs.winner === 2 ? this.logs.price2 : 0;
        const oddWon = this.logs.winner === 1 ? this.logs.odd1 :
            this.logs.winner === 2 ? this.logs.odd2 : 0;
        const returns = (houseWon * oddWon) - houseWon;
        const totalBet = this.logs.price1 + this.logs.price2;

        return houseWon + returns - totalBet;
    }

    calcPnlPercent() {
        const totalBet = this.logs.price1 + this.logs.price2;
        const result = this.calcPNL() / totalBet * 100;
        return result.toFixed(2) + '%';
    }

    /*
        Winner = 0 - No Result Yet
        Winner = 1 - House1 Win
        Winner = 2 - House2 Win
        Winner = 3 - House1 Draw No Lose
        Winner = 4 - House2 Draw No Lose
        Winner = 5 - Draw Both Houses No Lose
        Winner = 6 - House1 Draw Lose
        Winner = 7 - House2 Draw Lose
        Winner = 8 - Draw Both Houses Lose  
    */

    editBet(e) {
        // <float-box><bets-list bet="1675115217507"></bets-list></float-box>
        const floatBox = document.createElement('float-box');
        floatBox.innerHTML = `<edit-bet bet="${this.bet}"></edit-bet>`;
        this.shadowRoot.appendChild(floatBox);
    }

    render() {
        return html`
            <div class="bet-content">
                <div class="bet-house-odd-1 ${this.colorWin(this.logs.winner, 0, 1)}">
                    <div class="house-odd">
                        <div class="house-name">${this.houses.map(e => e.id === this.logs.house1 ? e.name : '')}</div>
                        <div class="bet-odd ${this.colorWin(this.logs.winner, 1, 1)}">@ ${this.logs.odd1}</div>
                    </div>
                    <div class="bet-values">
                        <div class="bet-price">${this.numberCurrency(this.logs.price1)}</div>
                        <div class="bet-return  ${this.colorWin(this.logs.winner, 1, 1)}">${this.logs.winner === 1 ? '+' + this.numberCurrency(this.logs.price1 * this.logs.odd1 - this.logs.price1) : this.logs.winner === 0 ? this.numberCurrency(this.logs.price1 * this.logs.odd1 - this.logs.price1) : '-' + this.numberCurrency(this.logs.price1)}</div>
                    </div>
                </div>
                <div class="bet-house-odd-2 ${this.colorWin(this.logs.winner, 0, 2)}">
                    <div class="house-odd">
                        <div class="house-name">${this.houses.map(e => e.id === this.logs.house2 ? e.name : '')}</div>
                        <div class="bet-odd ${this.colorWin(this.logs.winner, 1, 2)}">@ ${this.logs.odd2}</div>
                    </div>
                    <div class="bet-values">
                        <div class="bet-price">${this.numberCurrency(this.logs.price2)}</div>
                        <div class="bet-return  ${this.colorWin(this.logs.winner, 1, 2)}">${this.logs.winner === 2 ? '+' + this.numberCurrency(this.logs.price2 * this.logs.odd2 - this.logs.price2) : this.logs.winner === 0 ? this.numberCurrency(this.logs.price2 * this.logs.odd2 - this.logs.price2) : '-' + this.numberCurrency(this.logs.price2)}</div>
                    </div>
                </div>
                <div class="bet-date">${this.convertDate(this.logs.date)}</div>
                <div class="bet-pnl">${this.logs.winner > 0 ? this.numberCurrency(this.calcPNL()) : 0}</div>
                <div class="bet-pnl-percent">${this.logs.winner > 0 ? this.calcPnlPercent() : 0}</div>
                <div class="bet-actions">
                    <button class="button-edit" @click="${this.editBet}">
                        <svg aria-label="Editar perfil" aria-hidden="false" role="img" width="20" height="20" viewBox="0 0 24 24">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M19.2929 9.8299L19.9409 9.18278C21.353 7.77064 21.353 5.47197 19.9409 4.05892C18.5287 2.64678 16.2292 2.64678 14.817 4.05892L14.1699 4.70694L19.2929 9.8299ZM12.8962 5.97688L5.18469 13.6906L10.3085 18.813L18.0201 11.0992L12.8962 5.97688ZM4.11851 20.9704L8.75906 19.8112L4.18692 15.239L3.02678 19.8796C2.95028 20.1856 3.04028 20.5105 3.26349 20.7337C3.48669 20.9569 3.8116 21.046 4.11851 20.9704Z" fill="currentColor"></path>
                        </svg>
                    </button>
                </div>
            </div>
        `;
    }
}
