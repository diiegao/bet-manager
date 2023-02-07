// import { Connect } from '../data/Connect';
import { AccountBalance } from './AccountBalance/AccountBalance';
import { BetsList } from './BetsList/BetsList';
import { BetsContent } from './BetsList/BetsContent';
import { FloatBox } from './FloatBox/FloatBox';
import { EditBet } from './EditBet/EditBet';
import { SelectUsers } from './SelectUsers/SelectUsers';
import { AddNewUser } from './AddNewUser/AddNewUser';
import { AddNewHouse } from './AddNewHouse/AddNewHouse';
import { AddNewTransaction } from './AddNewTransaction/AddNewTransaction';
import { AddNewBet } from './EditBet/AddBet';
import { Deposits } from './Deposits/Deposits';
import { RemoveBet } from './RemoveBet/RemoveBet';


customElements.define('my-balance', AccountBalance);
customElements.define('bets-list', BetsList);
customElements.define('bets-content', BetsContent);
customElements.define('float-box', FloatBox);
customElements.define('edit-bet', EditBet);
customElements.define('select-users', SelectUsers);
customElements.define('create-user', AddNewUser);
customElements.define('create-house', AddNewHouse);
customElements.define('create-transaction', AddNewTransaction);
customElements.define('create-bet', AddNewBet);
customElements.define('my-deposits', Deposits);
customElements.define('remove-bet', RemoveBet);