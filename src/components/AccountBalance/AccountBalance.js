import { LitElement, html, css } from 'lit';
import { Styles } from './Styles';

export class AccountBalance extends LitElement {

    constructor() {
        super();
    }

    static styles = Styles;

    render() {
        return html`
            <h2>My Balance</h2>
            <div class="houses-balance">
                <div class="house-box-content">
                    <div class="house-name">Betsson</div>
                    <div class="house-balance">R$ 1500,00</div>
                </div>
                <div class="house-box-content">
                    <div class="house-name">Betano</div>
                    <div class="house-balance">R$ 1500,00</div>
                </div>
                <div class="house-box-content">
                    <div class="house-name">Pinnacle</div>
                    <div class="house-balance">R$ 1500,00</div>
                </div>
                <div class="house-box-content">
                    <div class="house-name">Bet365</div>
                    <div class="house-balance">R$ 1500,00</div>
                </div>
            </div>
        `;
    }
}
