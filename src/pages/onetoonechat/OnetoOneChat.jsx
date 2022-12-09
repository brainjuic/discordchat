import React,{lazy,Suspense} from 'react'
import { Route, Switch } from 'react-router'
import Spinner from '../../components/Spinner/Spinner';
const Home_oneToOne_chat=lazy(()=>import('../Home_oneToOne_chat/Home_oneToOne_chat'))
const OnetoOneChat = ({match}) => {
    return (
        <>
        <Suspense fallback={<Spinner/>}>
            <Switch>
                <Route path={`${match.path}/:chatId`} component={Home_oneToOne_chat}/>
            </Switch>
        </Suspense>
        </>
    )
}

export default OnetoOneChat
