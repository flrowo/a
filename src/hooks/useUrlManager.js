import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../redux/globalSlice";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

const keys = {
    page: "page",
}

export default function useUrlManager() {
    const [params, setParams] = useSearchParams();
    const dispatch = useDispatch();
    const page = useSelector(state => state.globalSlice.page);

    useEffect(() => {
        dispatch(setPage(params.get(keys.page)));
    }, []);

    return {
        page: {
            set: (url) => {
                if (url == null || url === "") {
                    params.delete(keys.page);
                    setParams(params);
                }
                else {
                    setParams({ [keys.page]: url });
                }
                dispatch(setPage(url));
            },
            get: () => page,
        },
    }
}