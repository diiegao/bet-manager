import { LitElement, html } from 'lit';
import { openDB } from 'idb';
import { Session } from '../../data/Session';
import { Styles } from './Styles';
import { Colors } from '../../utils/Colors';

export class AddNewHouse extends LitElement {

    constructor() {
        super();
        this.session = new Session();
    }

    static styles = Styles;

    async sendNewHouse(e) {
        const houseName = this.renderRoot.querySelector('.house-name');
        const notification = this.renderRoot.querySelector('.notification');
        const userId = this.session.get();

        if (houseName.value === '') {
            notification.setAttribute('style', 'padding: 5px');
            notification.innerHTML = 'Please fill the field above.';
            houseName.setAttribute('style', `border: 1px solid ${Colors.red1}`);
            return;
        }

        if (!userId) {
            notification.setAttribute('style', 'padding: 5px');
            notification.innerHTML = 'Please select a profile.';
            return;
        }

        const db = await openDB('bets', 1);
        db.add('houses', { id: Date.now(), name: houseName.value, balance: Number(0), user: userId })
            .then(result => window.location.reload())
            .catch(console.log('error create new house'));
        db.close();
    }

    render() {
        return html`
            <h2>ADD NEW HOUSE</h2>
            <div class="content">
                <div class="box-input">
                    <span>Name</span>
                    <input type="text" class="house-name" placeholder="House Name.">
                </div>
                <div class="notification"></div>
                <button class="send-new-house" @click=${this.sendNewHouse}>Create</button>
            </div>
            `;
    }
}