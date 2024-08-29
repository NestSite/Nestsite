"use client"

import { ROUTE } from "@/lib/constants";
import { AdminPageHeader } from "../../_components/admin-sections";
import SubscriptionPlanDialog from "../_components/SubscriptionPlanDialog";
import { Button } from "@/components/ui/button";
import { CarFront, Globe, Pencil, Plus, Search, UserRound, Zap } from "lucide-react";
import { useRouter } from 'next/navigation';
import SubscriptionCard from "../_components/SubscriptionCard";



export default function Pages() {
  const router = useRouter();

  return (

    <div className="flex flex-col self-stretch px-16 mt-8 max-md:px-5 max-md:max-w-full">
      <AdminPageHeader title="Subscription Pages" />
      <div className="flex w-full mt-12 items-center justify-end">
        <SubscriptionPlanDialog title="Add Plan">
          <Button className="flex items-center w-fit h-full gap-3 py-3">
            <Plus size={'1.1rem'} />
            Add Subscription plans
          </Button>
        </SubscriptionPlanDialog>
      </div>
      <div className="flex flex-wrap w-full gap-6 mt-4 lg:flex-nowrap items center">
        <SubscriptionCard />
      </div>
    </div>

  );
}
