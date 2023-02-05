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
            <bets-content></bets-content>
        </div>
        <div class="account-info">
            <my-balance></my-balance>
            <my-deposits></my-deposits>
        </div>
    </div>
    <footer>
        <p>made by <a href="https://twitter.com/xBlackBeardSOL">BlackBeard</a></p>
    </footer>
`;

render(appContent, document.querySelector('#app'));