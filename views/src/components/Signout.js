const { useEffect } = require("react");
const { authSignoutAction } = require("../actions/auth.actions");

const Signout = (props) => {
    const { setUser } = props;

    useEffect(() => {
        return () => authSignoutAction(setUser, () => { });
    }, [setUser]);

    return <></>;
};

export default Signout;