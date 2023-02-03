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
        flex-direction: column;
        font-size: 14px;
        font-weight: 300;
    }

    .house-name,
    .house-balance {
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

    .send-new-house {
        color: #333;
        font-size: 16px;
        background-color: ${unsafeCSS(Colors.green4)};
        border: 1px solid ${unsafeCSS(Colors.green3)};
        border-radius: 5px;
        padding: 5px 10px;
        margin-top: 5px;
    }

    .send-new-house:hover {
        background-color: ${unsafeCSS(Colors.green1)};
        border: 1px solid ${unsafeCSS(Colors.green2)};
    }
`;