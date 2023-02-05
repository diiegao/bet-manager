import { LitElement, html, css } from 'lit';
import { Connect } from '../../data/Connect';
import { Session } from '../../data/Session';
import { Styles } from './Styles';

export class Deposits extends LitElement {

    static get properties() {
        return {
            deposits: { type: Array },
            total: { type: Number },
            page: { type: Number },
            limit: { type: Number }
        };
    }

    constructor() {
        super();
        this.db = new Connect();
        this.session = new Session();
        this.deposits = [];
        this.page = 1;
        this.limit = 6;
        this.total = 0;
    }

    async connectedCallback() {
        super.connectedCallback();
        await this.db.getDepositsByUser(this.session.get(), this.page, this.limit).then(keys => this.deposits = keys);
        const renderContent = this.renderRoot?.querySelector('.user-balance');
        this.deposits.map(trans => renderContent.appendChild(this.createNewElement(trans)));
        this.total = await this.db.countDeposits(this.session.get());
    }

    static styles = Styles;

    numberCurrency(number) {
        return number?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    convertDate(num) {
        const date = new Date(num);
        const newDate = date.toLocaleString('pt-BR');
        return newDate;
    }

    addNewTransaction(e) {
        const floatBox = document.createElement('float-box');
        floatBox.innerHTML = `<create-transaction></create-transaction>`;
        this.parentElement.appendChild(floatBox);
    }

    createNewElement(transaction) {
        const boxContent = document.createElement('div');
        boxContent.setAttribute('class', 'user-box-content');
        boxContent.innerHTML = `
            <div class="house-name size">${transaction.housename}</div>
            <div class="house-date size">${this.convertDate(transaction.date)}</div>
            <div class="house-balance size ${transaction.type === 0 ? 'deposit' : 'withdraw'}">${transaction.type === 0 ? '' : '-'}${this.numberCurrency(transaction.value)}</div>
        `;
        return boxContent;
    }

    async nextPage() {
        this.page = Math.min(this.page + 1, Math.ceil(this.total / this.limit));
        await this.db.getDepositsByUser(this.session.get(), this.page, this.limit).then(keys => this.deposits = keys);
        const renderContent = this.renderRoot?.querySelector('.user-balance');
        renderContent.innerHTML = '';
        this.deposits.map(trans => renderContent.appendChild(this.createNewElement(trans)));
    }

    async prevPage() {
        this.page = Math.max(this.page - 1, 1);
        await this.db.getDepositsByUser(this.session.get(), this.page, this.limit).then(keys => this.deposits = keys);
        const renderContent = this.renderRoot?.querySelector('.user-balance');
        renderContent.innerHTML = '';
        this.deposits.map(trans => renderContent.appendChild(this.createNewElement(trans)));
    }

    render() {
        return html`
            <div class="header">
                <h2>Deposits / Withdraw</h2>
                <button class="create-new-transaction" @click=${this.addNewTransaction} ?disabled=${!this.session.get()}>New Transaction</button>
            </div>
            <div class="info-user-balance">
                <div class="info-house-name size">Name</div>
                <div class="info-house-date size">Date</div>
                <div class="info-house-balance size">Balance</div>
            </div>
            <div class="user-balance"></div>
            <div class="container" ?hidden=${this.total < this.limit}>
                <button @click=${this.prevPage} ?disabled=${this.page === 1} class="page-button"><</button>
                <button @click=${this.nextPage} ?disabled=${this.page === Math.ceil(this.total / this.limit)} class="page-button">></button>
            </div>
        `;
    }
}
