import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'
import React from 'react'
import SubscriptionPlanDialog from './SubscriptionPlanDialog'

const SubscriptionCard = () => {
    return (
        <div className='flex p-4 flex-col bg-white justify-center items-center gap-4 rounded-md'>
            <div className="flex flex-col items-center gap-2">
                <p className="text-3xl font-medium">Every month plan</p>
                <p className="text-primary">
                    <span className='text-black font-extrabold text-3xl pr-2'>$2</span>
                    Tasker plan
                </p>
            </div>
            <div className="flex flex-col items-center gap-4">
                <p className="flex items-center text-lg text-muted-foreground">
                    <Check color="#008000" strokeWidth={1.5} />
                    20 miles unlocked
                </p>
                <p className="flex items-center text-lg text-muted-foreground">
                    <Check color="#008000" strokeWidth={1.5} />
                    Cancel Subscription Anytime
                </p>
            </div>

            <SubscriptionPlanDialog title="Edit Plan">
                <Button className='w-full my-4'>Edit</Button>
            </SubscriptionPlanDialog>

        </div>
    )
}

export default SubscriptionCard