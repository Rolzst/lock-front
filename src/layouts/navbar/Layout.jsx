import PropTypes from "prop-types";
import {Sidebar} from "./Sidebar.jsx";
import AuthLink from "./AuthLink.jsx";

const Layout = ({children}) => {

    return (
        <div className={'flex flex-col w-screen h-screen bg-light-blue-900 text-white'}>
            <div className={'flex flex-row justify-between items-center px-7 bg-blue-gray-900'}>
                <div>
                    <Sidebar/>
                    <a href="/">
                        LockBox
                    </a>
                </div>

                <div className={'flex flex-row space-x-7'}>
                    <AuthLink/>
                </div>
            </div>

                {children}
        </div>
    )
        ;
}

Layout.propTypes = {
    children: PropTypes.any,
}

export default Layout;