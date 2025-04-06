import { useLocation, useNavigate } from "react-router-dom";

export default () => {
    const navigate = useNavigate();
    const location = useLocation();

    const getValue = (name) => {
        const params = new URLSearchParams(location.search);
        const value = params.get(name);
        return value;
    }

    return {
        page: {
            set: (value) => {
                const params = new URLSearchParams(location.search);
                if (value == null) params.delete("page");
                else params.set("page", value);
                navigate({ search: params.toString() });
            },
            value: getValue("page"),
        }
    };
}