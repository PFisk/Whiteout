import Link from 'next/link';
import Logo from '../public/logo.svg';
import LogoAlt from '../public/logo-hover-blue-alt.svg';

const Header = () => {

    return (
        <div className="header-wrapper">
            <div className='header-img-wrapper'>
                <div className='header-img-container'>
                    <div className='logo'>
                        <Link href="/">
                            <a>
                                <Logo />
                            </a>
                        </Link>
                    </div>
                    <div className='logo-alt'>
                        <Link href="/">
                            <a>
                                <LogoAlt />
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;