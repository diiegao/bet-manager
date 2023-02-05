import { css, unsafeCSS } from 'lit';
import { Colors } from '../../utils/Colors';

export const Styles = css`
    :host{
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-self: flex-start;
        width: 100%;
        padding: 5px 10px 10px;
        background-color: ${unsafeCSS(Colors.blue2)};
        border: 1px solid ${unsafeCSS(Colors.blue3)};
        border-radius: 5px;
        margin-top: 15px;
    }

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        margin: 15px 0;
    }

    h2 {
        font-size: 20px;
        margin: 0;
        color: #fff;
        text-transform: uppercase;
    }

    .create-new-house {
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        font-size: 16px;
        font-weight: bold;
        background-color: ${unsafeCSS(Colors.green3)};
        border: 1px solid ${unsafeCSS(Colors.green2)};
        border-radius: 5px;
        padding: 10px;
        margin-bottom: 5px;
        text-transform: uppercase;
        cursor: pointer;
    }

    .create-new-house:hover {
        background-color: ${unsafeCSS(Colors.green2)};
    }

    .create-new-house:disabled{
        background-color: ${unsafeCSS(Colors.green5)};
    }

    .houses-balance {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 100%;
    }

    .house-box-content,
    .table-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        padding: 2px 0;
        border-bottom: 1px solid ${unsafeCSS(Colors.blue3)};
        font-size: 15px;
    }

    .table-header {
        color: #ccc;
        font-size: 12px;
    }

    .house-win {
        color: ${unsafeCSS(Colors.green1)};
    }

    .house-lose {
        color: ${unsafeCSS(Colors.red1)};
    }

    .house-box-content:hover {
        background-color: ${unsafeCSS(Colors.blue3)};
    }

    .house-box-content:last-child {
        border: none;
    }

    .size {
        display: flex;
        justify-content: center;
        align-items: center;
        width: calc(430px/4);
    }

    .info-house-name,
    .house-name {
        justify-content: flex-start;
    }

    .info-house-balance,
    .house-balance {
        display: flex;
        justify-content: flex-end;
    }

`;