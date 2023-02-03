import { html, render } from 'lit';
import './components';
import '/style.css';

const appContent = html`
    <header>
        <h1>Gerenciador de BET</h1>
        <select-users></select-users>
    </header>
    <div class="main">
        <div class="bets-list">
            <h2>Bet List</h2>
            <bets-content></bets-content>
        </div>
        <div class="account-info">
            <create-betlog></create-betlog>
            <my-balance></my-balance>
        </div>
    </div>
`;

render(appContent, document.querySelector('#app'));