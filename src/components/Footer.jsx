import {useSelector} from 'react-redux';

const Footer = () => {

    const storeName = useSelector(store => store.store.name);

  return (
    <div className='h-24 w-full bg-slate-700 items-center flex'>
        <span className=' text-white text-xl font-medium m-auto '>
        Store Details @{storeName}
        </span>
    </div>
  )
}

export default Footer
