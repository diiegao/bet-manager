import { LitElement, html, css } from 'lit';
import { Connect } from '../../data/Connect';
import { Session } from '../../data/Session';
import { Styles } from './Styles';

export class SelectUsers extends LitElement {

    static get properties() {
        return {
            open: { type: Boolean },
            users: { type: Array },
            user: { type: Object }
        }
    }

    constructor() {
        super();
        this.db = new Connect();
        this.session = new Session();
        this.open = false;
        this.users = [];
        this.user = {};
    }

    connectedCallback() {
        super.connectedCallback();
        this.db.getUsers().then(keys => this.users = keys);
        this.db.getUserById(this.session.get()).then(keys => this.user = keys);
    }

    static styles = Styles;

    showListUser() {
        this.open = !this.open;
    }

    setUser(e) {
        const id = e.target.getAttribute('data-user-id');
        this.session.set(id);
        window.location.reload();
    }

    addNewUser(e) {
        console.log(this.parentElement);
        const floatBox = document.createElement('float-box');
        floatBox.innerHTML = `<create-user></create-user>`;
        this.parentElement.appendChild(floatBox);
    }

    render() {
        return html`
            <button class="user-selected" @click=${this.showListUser}>${this.session.get() ? this.user.name : 'Select Profile'}</button>
            <div class="users-list" ?hidden=${!this.open}>
                ${this.users.map(user => html`<div class="user-select" @click=${this.setUser} data-user-id="${user.id}">${user.name}</div>`)}
                <button class="add-new-user" @click=${this.addNewUser}>Add New User</button>
            </div>
            `;
    }

}