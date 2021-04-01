const PopupPage = (props) => {
    return (
        <div>
            <h2>{props.subject}</h2>
            {props.tutorsOfSubject.map((item, index) => {
                <p>item.firstName</p>
            })}
        </div>
    )
}

export default PopupPage