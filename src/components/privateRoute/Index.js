
import { Route, Redirect } from 'react-router-dom'
import { isLoggedin } from '../../utils/Authenticate'

// const RoleBasedRouting = ({ component: Component, role, ...rest }) => {
//     return (
//         <>
//             {isLoggedin(role) && (
//                 <Route
//                     {...rest}
//                     render={(props) => (
//                         <>
//                             <Component {...props} />
//                         </>
//                     )}
//                 />
//             )}
//             {
//                 !isLoggedin(role) && (
//                     <Redirect to={{ pathname: "/" }} />
//                 )
//             }
//         </>
//     );
// }

const RoleBasedRouting = ({ component: Component, ...rest }) => {
    return (
        <>
            {isLoggedin ?
                <Route
                    {...rest}
                    render={(props) => (
                        <>
                            <Component {...props} />
                        </>
                    )}
                />
                :
                <Redirect to={{ pathname: "/" }} />
            }
        </>
    );
}

export default RoleBasedRouting;