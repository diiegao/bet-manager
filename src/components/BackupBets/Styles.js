import { css, unsafeCSS } from 'lit';
import { Colors } from '../../utils/Colors';

export const Styles = css`
    :host{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        margin-top: 15px;
        border-radius: 5px;
    }

    .button {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        padding: 10px 0;
        margin: 0 10px;
        background: transparent;
        border: none;
        color: #fff;
        font-weight: bold;
        font-size: 18px;
        text-transform: uppercase;
        border-radius: 5px;
    }

    .import {
        background-color: ${unsafeCSS(Colors.blue5)};
        border: 1px solid ${unsafeCSS(Colors.blue4)};
    }

    .import:hover {
        background-color: ${unsafeCSS(Colors.blue4)};
    }

    .export {
        background-color: ${unsafeCSS(Colors.green3)};
        border: 1px solid ${unsafeCSS(Colors.green2)};
    }

    .export:hover {
        background-color: ${unsafeCSS(Colors.green2)};
    }

    .export:disabled {
        background-color: ${unsafeCSS(Colors.green5)};
    }
`;