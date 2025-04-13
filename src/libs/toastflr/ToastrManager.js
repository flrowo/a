import { useSelector } from "react-redux"

export default function ToastrManager () {
    const toastrs = useSelector(state => state.globalSlice.toastrs);

    return <div className="absolute bottom-[10px] left-[10px]">
        {toastrs.map(toastr => {
            return <div key={toastr.timestamp} className={toastr.className}>
                <h4>{toastr.title}</h4>
                <p>{toastr.timestamp}</p>
            </div>
        })}
    </div>
}