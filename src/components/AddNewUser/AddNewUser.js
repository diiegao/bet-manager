import { LitElement, html } from 'lit';
import { openDB } from 'idb';
import { Styles } from './Styles';

export class AddNewUser extends LitElement {

    constructor() {
        super();
    }

    static styles = Styles;

    async sendNewUser(e) {
        const getUser = this.renderRoot.querySelector('.user-name').value;

        const db = await openDB('bets', 1);
        db.add('users', { id: Date.now(), name: getUser })
            .then(result => window.location.reload())
            .catch(console.log('error create new user'));
        db.close();
    }

    render() {
        return html`
            <h2>ADD NEW USER</h2>
            <div class="add-new-user">
                <div class="name-user">
                    <span>Name</span>
                    <input type="text" class="user-name">
                </div>
                <button class="send-new-user" @click=${this.sendNewUser}>Create</button>
            </div>
            `;
    }
}