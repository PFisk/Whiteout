import React from 'react';
import Image from 'next/image';
import logo from '../public/logo.svg'

const Header = () => {
    return (
        <div className="header-wrapper">
            <div className='header-img-wrapper'>
                <Image
                    src={logo}
                    alt="Whiteout Logo"
                    layout={'responsive'}
                />
            </div>
        </div>
    )
}

export default Header;