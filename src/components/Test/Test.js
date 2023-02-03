import { LitElement, html, css } from 'lit';
import { Styles } from './styles';

export class MyElement extends LitElement {
    static get properties() {
        return {
            name: { type: String },
            count: {
                type: Number,
                hasChanged(newVal, oldVal) {
                    if (newVal > oldVal) {
                        console.log(`${newVal} > ${oldVal}. hasChanged: true.`);
                        return true;
                    }
                    else {
                        console.log(`${newVal} <= ${oldVal}. hasChanged: false.`);
                        return false;
                    }
                }
            }
        }
    }

    static styles = Styles;

    get teste() {
        return this.renderRoot.querySelector('.teste');
    }

    constructor() {
        super();
        this.name = 'World';
        this.count = 0;
    }

    _onClick() {
        this.count++;
        console.log(this.teste.value);
    }

    render() {
        return html`
          <h1>Hello, ${this.name}!</h1>
          <button @click=${this._onClick}>
            Click Count: ${this.count}
        </button>
        <input type="text" class="teste" .value="${this.count}">
        <slot></slot>
        `;
    }
}