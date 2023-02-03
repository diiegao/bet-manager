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
    }

    h2 {
        font-size: 20px;
        margin: 5px 0;
    }

    .houses-balance {
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        width: 100%;
    }

    .house-box-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        padding: 2px 0;
        border-bottom: 1px solid ${unsafeCSS(Colors.blue3)};
    }

    .house-box-content:hover {
        background-color: ${unsafeCSS(Colors.blue3)};
    }

    .house-box-content:last-child {
        border: none;
    }
`;