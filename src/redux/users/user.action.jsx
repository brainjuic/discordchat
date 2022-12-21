export const GoogleSignInStart=(walletAddress)=>{
    return{
        type:'Google_SignIn_Start',
        payload:walletAddress
    }
}
export const SignInSuccess=()=>{
    return{
        type:'SignIn_Success'
    }
}