import { css, unsafeCSS } from 'lit';
import { Colors } from '../../utils/Colors';

export const Styles = css`
    :host{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        width: 250px;
        height: 40px;
        position: relative;
        background-color: ${unsafeCSS(Colors.gray3)};
        border: 1px solid ${unsafeCSS(Colors.gray4)};
        border-radius: 5px;
        z-index: 10000;
    }

    [hidden] {
        display: none !important;
    }

    .users-list {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        position: absolute;
        top:45px;
        width: 100%;
        background-color: ${unsafeCSS(Colors.gray3)};
        border: 1px solid ${unsafeCSS(Colors.gray4)};
        border-radius: 5px;
    }

    .user-select,
    .add-new-user {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 30px;
        border-bottom: 1px solid ${unsafeCSS(Colors.gray4)};
        cursor: pointer;
    }

    .add-new-user {
        border: none;
        background-color: ${unsafeCSS(Colors.green4)};
        color: #fff;
        font-weight: 400;
        border-radius: 0 0 5px 5px;
    }

    .add-new-user:hover{
        background-color: ${unsafeCSS(Colors.green1)};
    }

    .user-select:last-child {
        border-bottom: none;
    }

    .user-selected {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 40px;
        border: none;
        background: transparent;
        color: #fff;
        font-size: 16px;
        font-weight: 300;
        cursor: pointer;
    }

    .user-select:hover,
    .user-selected:hover {
        background-color: ${unsafeCSS(Colors.gray4)};
    }
`;