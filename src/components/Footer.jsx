import {useSelector} from 'react-redux';

const Footer = () => {

  const storeName = useSelector(store => store.store.name);
  const address = useSelector(store => store.store.address);

  return (
    <div className='h-[4rem] w-full bg-slate-700 items-center flex bottom-0 fixed justify-center'>
        <div className='w-1/3 '>
        <span className=' text-white text-xl font-medium mx-2 flex flex-row gap-8 truncate'>
         &copy;{storeName} 
        </span>
        </div>
        <span className=' text-white text-xl font-medium mx-2 '>
        Store @{address}
        </span>
    </div>
  )
}

export default Footer
