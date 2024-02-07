import {useSelector} from 'react-redux';

const Footer = () => {

    const storeName = useSelector(store => store.store.name);

  return (
    <div className='h-[4rem] w-full bg-slate-700 items-center flex bottom-0 fixed'>
        <span className=' text-white text-xl font-medium m-auto '>
        Store Details &amp;{storeName}
        </span>
    </div>
  )
}

export default Footer
