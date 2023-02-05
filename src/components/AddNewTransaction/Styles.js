import { css, unsafeCSS } from 'lit';
import { Colors } from '../../utils/Colors';

export const Styles = css`
    :host{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 100%;
        margin-bottom: 15px;
        background-color: ${unsafeCSS(Colors.gray3)};
        border-radius: 5px;
    }

    h2 {
        display: flex;
        font-size: 18px;
        margin: 0;
        margin-top: 10px;
        padding: 15px;
    }

    .content {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 100%;
        padding: 15px;
    }

    .box-input {
        display: flex;
        justify-content: center;
        flex-direction: column;
        font-size: 14px;
        font-weight: 300;
    }

    .user-houses,
    .transaction-value {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        font-weight: 400;
        padding: 5px 10px;
        margin-bottom: 5px;
        background-color: ${unsafeCSS(Colors.gray5)};
        border: 1px solid ${unsafeCSS(Colors.gray4)};
        border-radius: 5px;
        color: #ccc;
        outline: none;
    }

    .transactions-options {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
    }

    .type-transaction {
        display: none;
    }

    .type-transaction + .transaction-button {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 5px 10px;
        margin: 5px;
        background-color: ${unsafeCSS(Colors.gray5)};
        border: 1px solid ${unsafeCSS(Colors.gray3)};
        text-transform: uppercase;
        border-radius: 5px;
        cursor: pointer;
    }

    .type-transaction:checked + .transaction-button {
        background-color: ${unsafeCSS(Colors.gray1)};
        border: 1px solid ${unsafeCSS(Colors.gray2)};
        box-shadow: 1px 1px 8px 2px ${unsafeCSS(Colors.gray5)}99;
    }

    .send-new-transaction {
        color: #333;
        font-size: 16px;
        background-color: ${unsafeCSS(Colors.green4)};
        border: 1px solid ${unsafeCSS(Colors.green3)};
        border-radius: 5px;
        padding: 5px 10px;
        margin-top: 5px;
    }

    .send-new-transaction:hover {
        background-color: ${unsafeCSS(Colors.green1)};
        border: 1px solid ${unsafeCSS(Colors.green2)};
    }

    .notification {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: ${unsafeCSS(Colors.red3)};
        border: ${unsafeCSS(Colors.red1)};
        border-radius: 5px;
        margin: 6px 0;
    }
`;