import Image from 'next/image';
import Link from 'next/link';
import logo from '../public/logo.svg';
import logoAlt from '../public/logo-hover-blue-alt.svg';

const Header = () => {

    return (
        <div className="header-wrapper">
            <div className='header-img-wrapper'>
                <div className='header-img-container'>
                    <div className='logo'>
                        <Link href="/">
                            <a>
                                <Image
                                    src={logo}
                                    alt="Whiteout Logo"
                                    layout={'responsive'}
                                />
                            </a>
                        </Link>
                    </div>
                    <div className='logo-alt'>
                        <Link href="/">
                            <a>
                                <Image
                                    src={logoAlt}
                                    alt="Whiteout Logo"
                                    layout={'responsive'}
                                />
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;