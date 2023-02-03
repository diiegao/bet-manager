import { LitElement, html } from 'lit';
import { Styles } from './Styles';

export class FloatBox extends LitElement {

    constructor() {
        super();
    }

    static styles = Styles;

    close(e) {
        this.remove();
    }

    render() {
        return html`
        <div class="box-content">
            <div class="header">
                <button class="close-button" @click="${this.close}">x</button>
            </div>
            <slot></slot>
        </div>
        `;
    }
}