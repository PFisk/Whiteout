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
                                <Logo width="100%" height="100%" viewBox="0 0 260 60"/>
                            </a>
                        </Link>
                    </div>
                    <div className='logo-alt'>
                        <Link href="/">
                            <a>
                                <LogoAlt width="100%" height="100%" viewBox="0 0 260 60"/>
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Header;