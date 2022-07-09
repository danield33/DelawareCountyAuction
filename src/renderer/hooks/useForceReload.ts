import {useState} from "react";

const useForceReload = () => {

    const [val, setVal] = useState(false);

    return () => setVal(!val);

};

export default useForceReload;
