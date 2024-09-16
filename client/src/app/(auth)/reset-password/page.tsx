import ResetPassword from "../reset-password";
export default function ResetPasswordPage() {
    return (
        <section className="section flex md:flex-row flex-col bg-black min-h-[60svh] md:items-center">
            <div className="flex flex-col justify-center flex-1">
                <div className="text-white max-w-[440px]">
                    <h1 className="text-2xl md:text-6xl mb-3 font-bold">Reset your Password</h1>
                    <p>
                        Enter your new password below. Make sure it is strong and easy for you to remember.
                        <br />
                    </p>
                </div>
            </div>
            <div className="flex-1">
                <div className="-mb-[50%]">
                    <ResetPassword />
                </div>
            </div>
        </section>
    );
}
