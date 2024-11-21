import { useState } from "react";
import { SocialButtons } from "./social-buttons";
import { toast } from "sonner";

export function Subscribe() {


    const [inputEmail, setInputEmail] = useState('')
    const [errorText, setErrorText] = useState('')

    const onSubmitEmail = () => {

        if (!inputEmail) return
        const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!validEmail.test(inputEmail)) {
            setErrorText('must be a valid email address ')
        }

        fetch('https://email.enreach.network/email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: inputEmail
            }),
        })
            .then(response => response.json())
            .then(data => {
                toast.success('Submit subscription successfully！');
                console.log('Success:', data);
            })
            .catch(error => {
                console.error('Error:', error);
            });

    }
    return <div className="relative flex flex-col items-center w-screen p-4 lg:p-16 sm:justify-center sm:mt-0 ">
        <div className="text-center section-title">Get Started</div>
        <div className="mt-4 text-white/50 sm:text-center">Stay Ahead of the Game: Subscribe to Receive the Latest Updates from EnReach!</div>
        <div className="flex flex-col gap-2 mt-8 mb-8 sm:gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 sm:gap-5 ">
                <div className="flex gap-2 sm:gap-5 sm:flex-col ">
                    <div>
                        <input onChange={(e) => { setInputEmail(e.target.value); setErrorText('') }} className="w-full h-12 px-4 border rounded-full sm:text-lg bg-black/10 lg:w-60 border-white/10" placeholder="Enter your email" />

                        <div className="mt-2 text-center text-red-600">
                            {errorText}
                        </div>
                    </div>
                    <button onClick={onSubmitEmail} className="bg-white h-12 text-black py-[10px] px-6 sm:text-lg rounded-full text-xl mr-4 w-full lg:w-auto">Subscribe</button>

                </div>


            </div>

        </div>

        <SocialButtons />
    </div>
}