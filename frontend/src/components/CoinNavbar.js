import React  from 'react'
import {FaCoins} from 'react-icons/fa'
import './CoinNavbar.css'



const CoinNavbar = () => {
  return (
    <div>
        <div className='coinnavbar'>
            <FaCoins className='icon'/>
            <h1> Coin <span className='purple'>Search</span></h1>

        </div>

    </div>
  )
}

export default CoinNavbar