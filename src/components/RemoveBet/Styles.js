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
        justify-content: space-around;
        align-content: center;
        font-size: 14px;
        font-weight: 300;
    }

    .house-1,
    .house-2 {
        display: flex;
        justify-content: center;
        align-content: center;
        width: 120px;

    }

    .bet-winner {
        color: ${unsafeCSS(Colors.green1)};
    }

    .bet-lose {
        color: ${unsafeCSS(Colors.red1)};
    }

    .bet-draw {
        color: ${unsafeCSS(Colors.yellow1)};
    }

    .bet-cashout {
        color: ${unsafeCSS(Colors.blue4)};
    }

    .bet-date {
        display: flex;
        justify-content: center;
        align-content: center;
        width: 100%;
        margin: 15px;
    }

    .buttons {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        margin: 15px 0;
    }

    .click-button {
        color: #fff;
        font-size: 16px;
        border-radius: 5px;
        padding: 5px 10px;
        margin: 0 10px;
    }

    .confirm {
        background-color: ${unsafeCSS(Colors.green1)};
        border: 1px solid ${unsafeCSS(Colors.green2)};
    }

    .confirm:hover {
        background-color: ${unsafeCSS(Colors.green2)};
        border: 1px solid ${unsafeCSS(Colors.green3)};
    }

    .close {
        background-color: ${unsafeCSS(Colors.red1)};
        border: 1px solid ${unsafeCSS(Colors.red2)};
    }

    .close:hover {
        background-color: ${unsafeCSS(Colors.red2)};
        border: 1px solid ${unsafeCSS(Colors.red3)};
    }
`;