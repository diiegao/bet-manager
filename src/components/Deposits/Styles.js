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
    
    .user-balance {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 100%;
    }

    .user-box-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        padding: 2px 0;
        border-bottom: 1px solid ${unsafeCSS(Colors.green2)};
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
`;