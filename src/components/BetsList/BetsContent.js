import { LitElement, html, css, unsafeCSS } from 'lit';
import { Colors } from '../../utils/Colors';
// import { openDB } from 'idb';
import { Connect } from '../../data/Connect';
import { Session } from '../../data/Session';
// import { insertHouse, createBetList, insertBet } from '../../controllers/BetsList';

export class BetsContent extends LitElement {

    static get properties() {
        return {
            bets: { type: Array }
        }
    }

    constructor() {
        super();
        this.db = new Connect();
        this.session = new Session();
        // createBetList();
        // insertBet();
        // insertHouse();
    }

    connectedCallback() {
        super.connectedCallback();
        this.db.getLogsByUser(this.session.get()).then(keys => this.bets = keys);
    }

    // async getBet() {
    //     const db = await openDB('bets', 1);
    //     const result = db.getAllKeys('logs');
    //     db.close();
    //     return result;
    // }

    static styles = css`
        :host {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;    
            width: 750px;
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
    `;

    render() {
        return html`
            <div class="description">
                <div class="house-1">House 1</div>
                <div class="house-2">House 2</div>
                <div class="bet-date">Date</div>
                <div class="bet-pnl">PNL</div>
                <div class="bet-pnl-percent">PNL%</div>
                <div class="configs">Manager</div>
            </div>
            ${Array.isArray(this.bets) ? this.bets.map((bet) => html`<bets-list bet="${bet.id}"></bets-list>`) : ''}
        `;
    }
}
