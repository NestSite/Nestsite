import RecoverPassword from "../recover-password";


export default async function RecoverPasswordPage() {
    return <section className="section flex md:flex-row flex-col bg-black min-h-[60svh] md:items-center">
        <div className="flex flex-col justify-center flex-1">
            <div className="text-white max-w-[440px]">
            <h1 className="text-2xl md:text-6xl mb-3 font-bold">Recover your Password</h1>
            <p>
                
            Enter the email associated with your account and we'll email you a link to reset your password.  <br/>
                
            </p>
       
            </div>
        </div>
     <div className="flex-1">
     <div className="-mb-[50%]">
        <RecoverPassword />
        </div>
     </div>
    </section>;
}
