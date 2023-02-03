import { css, unsafeCSS } from 'lit';
import { Colors } from '../../utils/Colors';

export const Styles = css`
    :host{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        width: 750px;
    }

    .bet-content {
        display: flex;
        align-items: center;
        width: 100%;
        padding: 5px;
        font-size: 14px;
    }

    .bet-house-odd-1,
    .bet-house-odd-2 {
        display: flex;
        justify-content: flex-start;
        flex-direction: column;
        width: 160px;
        padding: 0 5px;
        border-left: 4px solid ${unsafeCSS(Colors.gray5)};
        font-size: 16px;
    }

    .bet-house-winner {
        border-left: 4px solid ${unsafeCSS(Colors.green4)};
    }

    .bet-house-loser {
        border-left: 4px solid ${unsafeCSS(Colors.red1)};
    }

    .bet-house-draw {
        border-left: 4px solid ${unsafeCSS(Colors.yellow1)};
    }

    .house-odd {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 5px;
    }

    .bet-odd {
        font-weight: bold;
        font-size: 12px;
    }

    .bet-values {
        display:flex;
        justify-content: flex-start;
        align-items: center;
        font-weight: bold;
        font-size: 12px;
    }

    .bet-price {
        margin-right: 10px;
    }

    .bet-return {
        padding: 0 0 0 10px;
        border-left: 1px solid ${unsafeCSS(Colors.gray5)};
    }

    .bet-winner {
        color: ${unsafeCSS(Colors.green4)};
    }

    .bet-loser {
        color: ${unsafeCSS(Colors.red1)};
    }

    .bet-draw {
        color: ${unsafeCSS(Colors.yellow1)};
    }

    .bet-date,
    .bet-pnl,
    .bet-pnl-percent,
    .bet-actions {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 120px;
        height: 33px;
        padding: 0 5px;
        border-left: 1px solid ${unsafeCSS(Colors.gray5)};
    }

    .bet-date {
        width: 135px;
    }

    .bet-pnl {
        width: 90px;
    }

    .bet-pnl-percent,
    .bet-actions {
        width: 50px;
    }
    
    .button-edit {
        display: flex;
        align-items: center;
        cursor: pointer;
        color: #fff;
        background: transparent;
        border: none;
    }
`;