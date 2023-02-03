import { Connect } from '../data/Connect';
import { AccountBalance } from './AccountBalance/AccountBalance';
import { BetsList } from './BetsList/BetsList';
import { BetsContent } from './BetsList/BetsContent';
import { FloatBox } from './FloatBox/FloatBox';
import { EditBet } from './EditBet/EditBet';
import { SelectUsers } from './SelectUsers/SelectUsers';
import { AddNewUser } from './AddNewUser/AddNewUser';
import { NewBetAndLog } from './NewBetAndLog/NewBetAndLog';
import { AddNewHouse } from './AddNewHouse/AddNewHouse';
import { AddNewBet } from './EditBet/AddBet';

const initDB = new Connect();
// console.log(initDB.getHousesByUser(1675280062731));
// console.log(initDB.getLogsByUser(1675280062731));
// console.log(initDB.getLogById(1675280062731, 1675115208369));

customElements.define('my-balance', AccountBalance);
customElements.define('bets-list', BetsList);
customElements.define('bets-content', BetsContent);
customElements.define('float-box', FloatBox);
customElements.define('edit-bet', EditBet);
customElements.define('select-users', SelectUsers);
customElements.define('create-user', AddNewUser);
customElements.define('create-betlog', NewBetAndLog);
customElements.define('create-house', AddNewHouse);
customElements.define('create-bet', AddNewBet);