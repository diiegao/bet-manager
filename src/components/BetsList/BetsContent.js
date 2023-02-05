import { LitElement, html, css, unsafeCSS } from 'lit';
import { Colors } from '../../utils/Colors';
// import { openDB } from 'idb';
import { Connect } from '../../data/Connect';
import { Session } from '../../data/Session';
// import { insertHouse, createBetList, insertBet } from '../../controllers/BetsList';

export class BetsContent extends LitElement {

    static get properties() {
        return {
            bets: { type: Array },
            page: { type: Number },
            limit: { type: Number },
            total: { type: Number },
            totalHouses: { type: Number }
        }
    }

    constructor() {
        super();
        this.db = new Connect();
        this.session = new Session();
        this.bets = [];
        this.page = 1;
        this.limit = 20;
        this.total = 0;
        this.totalHouses = 0;
    }

    async connectedCallback() {
        super.connectedCallback();
        await this.db.getLogsByUser(this.session.get(), this.page, this.limit).then(keys => this.bets = keys);
        const getListElement = this.shadowRoot?.querySelector('.list');
        this.bets.map((bet) => {
            const newBet = document.createElement('bets-list');
            newBet.setAttribute('bet', bet.id);
            getListElement.appendChild(newBet);
        })
        this.total = await this.db.countLogs(this.session.get());
        this.totalHouses = await this.db.countHouses(this.session.get());
    }

    async nextPage() {
        this.page = Math.min(this.page + 1, Math.ceil(this.total / this.limit));
        await this.db.getLogsByUser(this.session.get(), this.page, this.limit).then(keys => this.bets = keys);
        const getListElement = this.shadowRoot?.querySelector('.list');
        getListElement.innerHTML = '';
        this.bets.map((bet) => {
            const newBet = document.createElement('bets-list');
            newBet.setAttribute('bet', bet.id);
            getListElement.appendChild(newBet);
        })
    }

    async prevPage() {
        this.page = Math.max(this.page - 1, 1);
        await this.db.getLogsByUser(this.session.get(), this.page, this.limit).then(keys => this.bets = keys);
        const getListElement = this.shadowRoot?.querySelector('.list');
        getListElement.innerHTML = '';
        this.bets.map((bet) => {
            const newBet = document.createElement('bets-list');
            newBet.setAttribute('bet', bet.id);
            getListElement.appendChild(newBet);
        })
    }

    static styles = css`
        :host {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;    
            width: 750px;
        }
        
        [hidden] {
            display: none !important;
        }

        .description {
            display: flex;
            align-items: center;
            width: 100%;
            background-color: #2c2f31;
            padding: 10px 0;
        }

        .house-1,
        .house-2 {
            width: 160px;
            padding: 0 7px;
        }

        .bet-date {
            width: 145px;
            padding: 0 3px;
        }

        .bet-pnl {
            width: 90px;
            padding: 0 3px;
        }

        .bet-pnl-percent {
            width: 65px;
            padding: 0 7px;
        }

        bets-list:nth-child(odd) {
            background-color: ${unsafeCSS(Colors.gray3)};
        }

        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            margin: 15px 0;
        }

        .counter {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 10px;
            font-size: 14px;
            margin-bottom: -15px;
        }

        .create-new-log {
            display: flex;
            justify-content: center;
            align-items: center;
            color: #fff;
            font-size: 16px;
            font-weight: bold;
            background-color: ${unsafeCSS(Colors.green3)};
            border: 1px solid ${unsafeCSS(Colors.green2)};
            border-radius: 5px;
            padding: 10px;
            text-transform: uppercase;
            cursor: pointer;
        }

        .create-new-log:hover {
            background-color: ${unsafeCSS(Colors.green2)};
        }

        .create-new-log:disabled {
            background-color: ${unsafeCSS(Colors.green5)};
        }

        .container {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            margin: 15px 0;
        }

        .page-info {
            font-size: 12px;
        }

        .page-button {
            display: flex;
            justify-content: center;
            align-items: center;
            color: #fff;
            font-size: 12px;
            font-weight: bold;
            background-color: ${unsafeCSS(Colors.gray3)};
            border: 1px solid ${unsafeCSS(Colors.gray4)};
            border-radius: 5px;
            padding: 5px;
            margin: 0 5px;
            text-transform: uppercase;
            cursor: pointer;
        }

        .page-button:hover {
            background-color: ${unsafeCSS(Colors.gray4)};
        }

        .page-button:disabled {
            background-color: ${unsafeCSS(Colors.gray2)};
        }

    `;

    addNewBet(e) {
        const floatBox = document.createElement('float-box');
        floatBox.innerHTML = `<create-bet></create-bet>`;
        this.parentElement.appendChild(floatBox);
    }

    render() {
        return html`
        <div class="header">
            <div class="counter">Total BET's: ${this.total}</div>
            <button class="create-new-log" @click=${this.addNewBet} ?disabled=${!this.session.get() || this.totalHouses <= 1}>New BET</button>
        </div>
            <div class="description">
                <div class="house-1">House 1</div>
                <div class="house-2">House 2</div>
                <div class="bet-date">Date</div>
                <div class="bet-pnl">PNL</div>
                <div class="bet-pnl-percent">PNL%</div>
                <div class="configs">Manager</div>
            </div>
            <div class="list"></div>
            <div class="container" ?hidden=${this.total < this.limit}>
                <button @click=${this.prevPage} ?disabled=${this.page === 1} class="page-button">Previous</button>
                <span class="page-info">Page ${this.page} of ${Math.ceil(this.total / this.limit)}</span>
                <button @click=${this.nextPage} ?disabled=${this.page === Math.ceil(this.total / this.limit)} class="page-button">Next</button>
            </div>
        `;
    }
}
