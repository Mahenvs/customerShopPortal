import {useSelector} from 'react-redux';
import BottomPopUp from '../UI_Elements/BottomPopUp';

const Footer = () => {

    const storeName = useSelector(store => store.store.name);
    const address = useSelector(store => store.store.address);

  return (
    <div className='h-[4rem] w-full bg-slate-700 items-center flex bottom-0 fixed'>
        <span className=' text-white text-xl font-medium m-auto '>
         &copy;{storeName} Store @{address}
        </span>
        <BottomPopUp/>
    </div>
  )
}

export default Footer
