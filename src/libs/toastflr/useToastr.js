import { useDispatch, useSelector } from 'react-redux';
import { addToastr, removeToastr } from '../../redux/globalSlice';

export default function useToastr() {
    const dispatch = useDispatch();
    const toastrs = useSelector(state => state.globalSlice.toastrs);

    const add = ({ type, title, msg, timeout = 3000, className }) => {
        const timestamp = Date.now();
        const toastr = { type, title, msg, timeout, className, timestamp };

        dispatch(addToastr(toastr));

        setTimeout(() => {
            dispatch(removeToastr(timestamp));
        }, timeout);
    };

    return { addToastr: add, toastrs };
}