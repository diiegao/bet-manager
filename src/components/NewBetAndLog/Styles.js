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
    }

    .create-new-log,
    .create-new-house {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 70%;
        color: #fff;
        font-size: 16px;
        font-weight: bold;
        background-color: ${unsafeCSS(Colors.gray3)};
        border: 1px solid ${unsafeCSS(Colors.gray4)};
        border-radius: 5px;
        padding: 10px;
        margin-bottom: 5px;
        text-transform: uppercase;
        cursor: pointer;
    }

    .create-new-log:hover,
    .create-new-house:hover {
        background-color: ${unsafeCSS(Colors.gray4)};
    }
`;