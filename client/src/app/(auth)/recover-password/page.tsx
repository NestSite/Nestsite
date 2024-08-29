import RecoverPassword from "../recover-password";


export default async function RecoverPasswordPage() {
    return <section className="section flex md:flex-row flex-col bg-primary min-h-[60svh] md:items-center">
        <div className="flex flex-col justify-center flex-1">
            <div className="text-white max-w-[440px]">
            <h1 className="text-2xl md:text-6xl mb-3 font-bold">Recover your Password</h1>
            <p>
                
            Our Mission today and tomorrow is to support Seekers in getting more of their TO-DO-LIST completed by nearby lovely Taskers who need income to keep grinding in the face of tough economies. 
                <br/>
                <br/>
Have a great day doing this with us!     
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
