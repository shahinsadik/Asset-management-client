
import UserTable from './UserTable';
import Subscriptions from './../../Home/Subscriptions';


const AddEmployee = () => {
    // const {user} = useAuth()
    
    
    return (
        <div>
            
            <div>
        <Subscriptions></Subscriptions>
            </div>
            <div >
               <UserTable></UserTable> 
            </div>
        </div>
    );
};

export default AddEmployee;