import React from 'react'
import {Route, Redirect} from "react-router-dom"

export const ProtectedRoute = ({component: Component, isAuth: isAuth, ...rest}) => {
    return (
        <Route {...rest} render={
            (props) => {
                //console.log(isAuth)
                if (isAuth) {
                    return <Component {...props}/>
                }
                else {
                    return <Redirect to={
                        {
                            pathname: '/',
                            state: {
                                from: props.location
                            }

                        }
                    }/>
                }
                
            }
        }/>
    )
}

export default ProtectedRoute
