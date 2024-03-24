import { useSelector } from 'react-redux';

export const UserToken=()=>{
    const userToken=useSelector((state)=>state?.currentUser[0]?.token);
    return userToken;
}