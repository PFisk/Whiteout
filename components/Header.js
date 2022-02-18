import Image from 'next/image';
import logo from '../public/logo.svg';
import logoAlt from '../public/logo-hover-blue-alt.svg';

const Header = () => {

    return (
        <div className="header-wrapper">
            <div className='header-img-wrapper'>
                <div className='header-img-container'>
                    <div className='logo'>
                        <a href="/">
                            <Image
                                src={logo}
                                alt="Whiteout Logo"
                                layout={'responsive'}
                            />
                        </a>
                    </div>
                    <div className='logo-alt'>
                        <a href="/">
                            <Image
                                src={logoAlt}
                                alt="Whiteout Logo"
                                layout={'responsive'}
                            />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;