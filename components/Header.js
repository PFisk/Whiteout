import { useState } from 'react';
import Image from 'next/image';
import logo from '../public/logo.svg';
import logoHover from '../public/logo-hover-blue-alt.svg';

const Header = () => {
    const [hover, setHover] = useState(false);

    return (
        <div className="header-wrapper">
            <div className='header-img-wrapper'>
                <a href="/">
                    <div 
                        onMouseOver={() => setHover(true)}
                        onMouseOut={() => setHover(false)}
                    >
                    <Image
                        src={hover ? logoHover : logo}
                        alt="Whiteout Logo"
                        layout={'responsive'}
                    />
                    </div>
                </a>
            </div>
        </div>
    )
}

export default Header;