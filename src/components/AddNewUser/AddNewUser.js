import { LitElement, html } from 'lit';
import { openDB } from 'idb';
import { Styles } from './Styles';
import { Colors } from '../../utils/Colors';

export class AddNewUser extends LitElement {

    constructor() {
        super();
    }

    static styles = Styles;

    async sendNewUser(e) {
        const getUser = this.renderRoot.querySelector('.user-name');
        const notification = this.renderRoot.querySelector('.notification');

        if (getUser.value === '') {
            notification.setAttribute('style', 'padding: 5px');
            notification.innerHTML = 'Please fill the field above.';
            getUser.setAttribute('style', `border: 1px solid ${Colors.red1}`);
            return;
        }

        const db = await openDB('bets', 1);
        db.add('users', { id: Date.now(), name: getUser.value })
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
                    <input type="text" class="user-name" placeholder="Name">
                </div>
                <div class="notification"></div>
                <button class="send-new-user" @click=${this.sendNewUser}>Create</button>
            </div>
            `;
    }
}