import { LitElement, html, css } from 'lit';
import { Connect } from '../../data/Connect';
import { Session } from '../../data/Session';
import { Styles } from './Styles';

export class Deposits extends LitElement {

    static get properties() {
        return {
        };
    }

    constructor() {
        super();
        this.db = new Connect();
        this.session = new Session();
    }

    async connectedCallback() {
        super.connectedCallback();
        // this.db.getHousesByUser(this.session.get()).then(keys => this.houses = keys);
    }

    static styles = Styles;

    numberCurrency(number) {
        return number?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    // addNewHouse(e) {
    //     const floatBox = document.createElement('float-box');
    //     floatBox.innerHTML = `<create-house></create-house>`;
    //     this.parentElement.appendChild(floatBox);
    // }

    render() {
        return html`
            <div class="header">
                <h2>Deposits / Withdraw</h2>
                <button class="create-new-house" @click=${this.addNewHouse} ?disabled=${!this.session.get()}>New House</button>
            </div>
            <div class="user-balance">
                <div class="user-box-content">
                    <div class="house-name">Teste</div>
                    <div class="house-balance deposit">${this.numberCurrency(100)}</div>
                </div>
                <div class="user-box-content">
                <div class="house-name">Teste</div>
                <div class="house-balance deposit">${this.numberCurrency(100)}</div>
            </div>
            <div class="user-box-content">
                <div class="house-name">Teste</div>
                <div class="house-balance withdraw">${this.numberCurrency(100)}</div>
            </div>
            <div class="user-box-content">
                <div class="house-name">Teste</div>
                <div class="house-balance withdraw">${this.numberCurrency(100)}</div>
            </div>
            </div>
        `;
    }
}
