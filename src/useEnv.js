import { useContext } from 'react';
import EnvContext from './env-context'

const useEnv = () => {
    const context = useContext(EnvContext);

    if(context === undefined) {
        throw new Error("useEnv must be used within a EnvProvider");
    }

    return context;
}

export default useEnv