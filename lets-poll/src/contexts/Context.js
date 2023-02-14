import { createContext, useEffect, useState } from 'react';
export const Context = createContext({});

const ContextProvider = (props) => {
    const [ip,setIP] = useState('');

    useEffect(() => {
        const getMyIp = async () => {
            await fetch('https://api.ipify.org?format=json').then(response => {
                return response.json();
            }).then((res) => {
                setIP(res.ip)
            }).catch((err) => console.error('Problem fetching my IP', err))
        }
        getMyIp()
    }, [])
    
    return (
        <Context.Provider 
            value={{userIP: ip}}
        >
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;