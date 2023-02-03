import { css, unsafeCSS } from 'lit';
import { Colors } from '../../utils/Colors';

export const Styles = css`
    :host{
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 99999;
        background-color: rgba(0, 0, 0, .7);
    }

    .header{
        display: flex;
        justify-content: flex-end;
        align-items: center;
        width: 100%;
        max-width: 1200px;
    }

    .box-content {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        max-width: 1200px;
        border-radius: 5px;
    }

    .close-button {
        color: red;
        font-weight: bold;
        font-size: 14px;
        margin: 5px 0;
        cursor: pointer;
        background: transparent;
        border: none;
    }
`;