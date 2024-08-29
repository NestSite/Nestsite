"use client";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { EditIcon, Eye, EyeOff, EllipsisVertical, Trash, BanIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";


export default function ListBuilderActions<T,>({
    isHidden,
    hideFunction,
    editFunction,
    viewFunction,
    editButton,
    deleteFunction,
}: {
    isHidden?: boolean;
    hideFunction?: () => Promise<void>;
    editButton?: ReactNode;
    viewFunction?: () => Promise<void>;
    editFunction?: () => Promise<void>;
    deleteFunction?: () => Promise<void>;
}) {
    const router = useRouter();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative rounded-full">

                    <EllipsisVertical />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="" align="center" forceMount>




                <DropdownMenuItem onClick={() => editFunction && editFunction()} className="flex gap-2 p-1">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-accent">
                        <EditIcon size={17} className="text-primary" />
                    </div>
                    <p>Edit</p>

                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => deleteFunction && deleteFunction()} className="flex gap-2 p-1">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-400/20">
                        <BanIcon size={17} className="text-yellow-400" />
                    </div>
                    <p>Deactivate</p>

                </DropdownMenuItem>

            </DropdownMenuContent>

        </DropdownMenu >
    );
}
