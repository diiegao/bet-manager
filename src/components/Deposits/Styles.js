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
        background-color: ${unsafeCSS(Colors.green3)};
        border: 1px solid ${unsafeCSS(Colors.green2)};
        border-radius: 5px;
        margin-top: 15px;
        font-size: 15px;
    }

    [hidden] {
        display: none !important;
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

    .create-new-transaction {
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        font-size: 16px;
        font-weight: bold;
        background-color: ${unsafeCSS(Colors.blue5)};
        border: 1px solid ${unsafeCSS(Colors.blue4)};
        border-radius: 5px;
        padding: 10px;
        margin-bottom: 5px;
        text-transform: uppercase;
        cursor: pointer;
    }

    .create-new-transaction:hover {
        background-color: ${unsafeCSS(Colors.blue4)};
    }

    .create-new-transaction:disabled{
        background-color: ${unsafeCSS(Colors.blue1)};
    }
    
    .user-balance {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 100%;
    }

    .user-box-content,
    .info-user-balance {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        padding: 2px 0;
        border-bottom: 1px solid ${unsafeCSS(Colors.green2)};
    }

    .info-user-balance {
        color: #ccc;
        font-size: 12px;
    }

    .size {
        display: flex;
        justify-content: center;
        align-items: center;
        width: calc(430px/3);
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

    .user-box-content:hover {
        background-color: ${unsafeCSS(Colors.green2)};
    }

    .user-box-content:last-child {
        border: none;
    }

    .deposit {
        color: ${unsafeCSS(Colors.green1)};
    }

    .withdraw {
        color: ${unsafeCSS(Colors.red1)};
    }

    .container{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
    }

    .page-button {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 5px 0 0 5px;
        padding: 0 15px;
        background: transparent;
        border: none;
        color: #fff;
        font-weight: bold;
        cursor: pointer;
    }

    .page-button:disabled {
        color: #333;
    }
`;