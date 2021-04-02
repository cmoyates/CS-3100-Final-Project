import TextField from '@material-ui/core/TextField';

const SignUp = () => {
    return (
        <div>
            <form noValidate autoComplete="off">
                <TextField id="standard-basic" label="Standard" />
                <TextField id="filled-basic" label="Filled" variant="filled" />
                <TextField id="outlined-basic" label="Outlined" variant="outlined" />
            </form>
        </div>
    )
}

export default SignUp