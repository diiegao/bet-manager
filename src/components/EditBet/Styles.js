import { css, unsafeCSS } from 'lit';
import { Colors } from '../../utils/Colors';

export const Styles = css`
    :host{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        background-color: ${unsafeCSS(Colors.gray3)};
        border-radius: 5px;
    }

    .edit-content {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }

    h2 {
        font-size: 18px;
        font-weight: 400;
        padding: 0;
        margin: 10px 0;
    }

    .houses-edit {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    span {
        font-size: 14px;
        font-weight: 400;
        color: #ccc;
        margin-left: 5px;
    }

    .select-house-1,
    .select-house-2,
    input[type="text"] {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
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

    .edit-house-1,
    .edit-house-2 {
        display: flex;
        justify-content: center;
        flex-direction: column;
        width: 100%;
        max-width: 300px;
        padding: 10px;
    }

    .bet-status-edit {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
    }

    .bet-status-option {
        display: none;
    }

    .bet-status-option + .bet-status-button {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 5px 10px;
        margin: 5px;
        border-radius: 5px;
        cursor: pointer;
    }

    .button-waiting {
        background-color: ${unsafeCSS(Colors.gray5)};
        border: 1px solid ${unsafeCSS(Colors.gray3)};
    }

    .button-winner {
        background-color: ${unsafeCSS(Colors.green4)};
        border: 1px solid ${unsafeCSS(Colors.green3)};
    }

    .button-draw {
        background-color: ${unsafeCSS(Colors.yellow3)};
        border: 1px solid ${unsafeCSS(Colors.yellow2)};
    }

    .bet-status-option:checked + .bet-status-button {
        box-shadow: 1px 1px 8px 2px rgba(64,69,75,0.74);
    }

    .bet-status-option:checked + .bet-status-button.button-waiting {
        background-color: ${unsafeCSS(Colors.gray1)};
        border: 1px solid ${unsafeCSS(Colors.gray2)};
        box-shadow: 1px 1px 8px 2px ${unsafeCSS(Colors.gray5)}99;
    }

    .bet-status-option:checked + .bet-status-button.button-winner {
        color: #000;
        background-color: ${unsafeCSS(Colors.green1)};
        border: 1px solid ${unsafeCSS(Colors.green2)};
        box-shadow: 1px 1px 8px 2px ${unsafeCSS(Colors.green1)}99;
    }

    .bet-status-option:checked + .bet-status-button.button-draw {
        color: #000;
        background-color: ${unsafeCSS(Colors.yellow1)};
        border: 1px solid ${unsafeCSS(Colors.yellow2)};
        box-shadow: 1px 1px 8px 2px ${unsafeCSS(Colors.yellow1)}99;
    }

    .send-edit-bet {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10px 15px;
        margin: 15px;
        color: #fff;
        background-color: ${unsafeCSS(Colors.green4)};
        border: 1px solid ${unsafeCSS(Colors.green3)};
        font-size: 16px;
        border-radius: 5px;
    }

    .send-edit-bet:hover {
        background-color: ${unsafeCSS(Colors.green1)};
        border: 1px solid ${unsafeCSS(Colors.green2)};
    }
`;