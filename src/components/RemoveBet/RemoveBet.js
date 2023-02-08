import { LitElement, html } from 'lit';
import { openDB } from 'idb';
import { Connect } from '../../data/Connect';
import { Session } from '../../data/Session';
import { Styles } from './Styles';
import { Colors } from '../../utils/Colors';

export class RemoveBet extends LitElement {

    static get properties() {
        return {
            bet: { Type: Number },
            betLog: { Type: Array },
            houses: { Type: Array }
        }
    }

    constructor() {
        super();
        this.session = new Session();
        this.db = new Connect();
        this.bet = 0;
        this.betLog = [];
        this.houses = [];
    }

    async connectedCallback() {
        super.connectedCallback();
        await this.db.getLogById(this.session.get(), this.bet).then(keys => this.betLog = keys);
        await this.db.getHousesByUser(this.session.get()).then(keys => this.houses = keys);
    }

    static styles = Styles;

    async deleteBet(e) {
        console.log(this.bet);
        const db = await openDB('bets', 1);
        await db.delete('logs', Number(this.bet))
            .then(result => window.location.reload())
            .catch(console.error('error delete bet'));
        db.close();
    }

    showHouseName(id) {
        let result;
        this.houses.map(h => {
            if (h.id === id) {
                result = h.name
            }
        });
        return result;
    }

    colorHouse(obj, house) {
        let result = '';
        if (obj.winner === 1 && house === 1) {
            result = 'bet-winner';
        }
        if (obj.winner === 1 && house === 2) {
            result = 'bet-lose';
        }

        if (obj.winner === 2 && house === 2) {
            result = 'bet-winner';
        }
        if (obj.winner === 2 && house === 1) {
            result = 'bet-lose';
        }

        if (obj.winner === 3) {
            result = 'bet-draw';
        }
        if (obj.winner === 4) {
            result = 'bet-cashout';
        }

        return result;
    }

    convertDate(num) {
        const date = new Date(num);
        const newDate = date.toLocaleString('pt-BR');
        return newDate;
    }

    close(e) {
        this.parentElement.remove();
    }

    render() {
        return html`
            <h2>REMOVE BET</h2>
            <div class="content">
                <p>Are you sure you want to remove this bet?</p>
                <div class="box-input">
                    <div class="house-1">
                        <div class="house-name-1 ${this.colorHouse(this.betLog, 1)}">${this.showHouseName(this.betLog.house1 === 0 ? 'Null' : this.betLog.house1)}</div>
                    </div>
                    <div class="house-2">
                        <div class="house-name-2 ${this.colorHouse(this.betLog, 2)}">${this.showHouseName(this.betLog.house2 === 0 ? 'Null' : this.betLog.house2)}</div>
                    </div>
                </div>
                <div class="bet-date">${this.convertDate(this.betLog.date)}</div>
                <div class="buttons">
                    <button class="click-button close" @click=${this.close}>No</button>
                    <button class="click-button confirm" @click=${this.deleteBet}>Yes</button>
                </div>

            </div>
            `;
    }
}