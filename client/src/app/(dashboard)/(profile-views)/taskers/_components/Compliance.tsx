"use client"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Photo2 from "@/assets/photo2.png"
import Image from "next/image";
import { IconTrash, IconX } from "@tabler/icons-react";
import { TextArea } from "@/components/ui/textarea";
import BaseTable from "@/components/table/base-table";
import DocumentPreviewDialog from "./DocumentPreview.dialog";
import { kycList } from "@/lib/mock/kyc";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { kycColumnsMaker } from "./kyc.columns";

const Compliance = () => {
    const [docId, setDocId] = useState('')
    
    const kycColumns = kycColumnsMaker({
        previewDoc: (a) => setDocId(a),
    })
  return (
    <div className="flex flex-col w-full gap-3">
            <DocumentPreviewDialog open={docId} setOpen={(value) => setDocId(value)} />
             <Card className="flex flex-col w-full gap-6 p-1 py-6 bg-white rounded-lg">
               <CardContent>
               <div className="flex flex-col gap-2">
                    <label htmlFor="title" className="text-sm font-medium">Tasker Title*</label>
                    <Input
                        type="search"
                        placeholder="Hair Stylist"
                        className="w-full h-full py-3 bg-gray-50"
                        id="title"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="title" className="text-sm font-medium">Specialties*</label>
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="flex items-center gap-3 p-2 text-xs bg-gray-100 rounded-md">
                            Clipper
                            <IconX size='1rem' />
                        </span>
                        <span className="flex items-center gap-3 p-2 text-xs bg-gray-100 rounded-md">
                            Clipper
                            <IconX size='1rem' />
                        </span>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="title" className="text-sm font-medium">Gender Served</label>
                    <span className="flex items-center gap-3 p-2 text-xs bg-gray-100 rounded-md w-fit">
                        Male
                        <IconX size='1rem' />
                    </span>
                </div>
                <div className="flex justify-end">
                    <Button className="px-8 text-xs font-semibold md:px-12">
                        Update
                    </Button>
                </div>
                {/* <div className="flex items-center justify-between gap-4">
                    <h4 className="text-base font-semibold">Tomorrow Matters</h4>
                </div> */}
               </CardContent>
            </Card>
            <div className="flex-1 w-full gap-5 p-6 py-6 bg-white rounded-lg">
                <h4 className="pb-4 mb-4 text-base font-semibold border-b">KYC Verification</h4>
                <div className="mt-6 leading-[140%] overflow-scroll">
                    <BaseTable data={kycList} columns={kycColumns} showPagination={false} showFilters={false} />
                </div>
            </div>
            <div className="w-full gap-5 p-6 py-6 bg-white rounded-lg">
                <h4 className="pb-4 mb-4 text-base font-semibold border-b">Training Certificates and Trade Licence</h4>
                <div className="mt-6 leading-[140%] w-full">
                    <BaseTable data={kycList} columns={kycColumns} showPagination={false} showFilters={false} />
                </div>
            </div>
            <div className="flex flex-col w-full gap-6 p-6 py-6 bg-white rounded-lg">
                <div className="flex flex-col gap-2">
                    <label htmlFor="title" className="text-sm font-semibold">Tasker Expirence</label>
                    <Input
                        type="search"
                        placeholder="I have 5 years experience with my certificates "
                        className="w-full h-full py-3 bg-gray-50"
                        id="title"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="title" className="text-sm">Photos relevant to skills  and experience</label>
                    <div className="flex flex-wrap items-center gap-3">
                        <div className="rounded-md aspect-[12/10] relative group">
                            <Image src={Photo2} alt='profile' className="w-full h-full" />
                            <IconTrash color="white" size={'1rem'} className="absolute top-0 p-1 rounded-full cursor-pointer -right-2 bg-black/40" />
                        </div>
                        <div className="rounded-md aspect-[12/10] relative group">
                            <Image src={Photo2} alt='profile' className="w-full h-full" />
                            <IconTrash color="white" size={'1rem'} className="absolute top-0 p-1 rounded-full cursor-pointer -right-2 bg-black/40" />
                        </div>
                    </div>
                </div>
                {/* <div className="flex items-center justify-between gap-4">
                    <h4 className="text-base font-semibold">Tomorrow Matters</h4>
                </div> */}
            </div>
            <div className="flex flex-col w-full gap-6 p-6 py-6 bg-white rounded-lg">
                <div className="flex flex-col gap-2">
                    <label htmlFor="title" className="text-sm font-semibold">Character or Reference Letter</label>
                    <Input
                        type="search"
                        placeholder="Work Reference"
                        className="w-full h-full py-3 bg-gray-50"
                        id="title"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="title" className="text-sm">Individual&apos;s Full Name</label>
                    <Input
                        type="search"
                        placeholder="Singh Augustine"
                        className="w-full h-full py-3 bg-gray-50"
                        id="title"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="title" className="text-sm">Individual&apos;s Email</label>
                    <Input
                        type="search"
                        placeholder="example@gmail.com"
                        className="w-full h-full py-3 bg-gray-50"
                        id="title"
                    />
                </div>
                <div className="flex flex-col gap-6 xl:flex-row">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="title" className="text-sm">Individual&apos;s Address</label>
                        <Input
                            type="search"
                            placeholder="2345 Up town Mendeleev, New York"
                            className="w-full h-full py-3 bg-gray-50"
                            id="title"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="title" className="text-sm">Individual&apos;s Phone Number</label>
                        <Input
                            type="search"
                            placeholder="+127 893 3434"
                            className="w-full h-full py-3 bg-gray-50"
                            id="title"
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="title" className="text-sm">Remark</label>
                    <TextArea
                        placeholder="Say something"
                        rows={5}
                        className="w-full h-full py-3 bg-gray-50"
                        id="title"
                    />
                </div>
                <div className="flex justify-end">
                    <Button className="px-8 text-xs font-semibold md:px-12">
                        Update
                    </Button>
                </div>
            </div>
            <div className="w-full p-6 py-6 bg-white rounded-lg">
                <h3 className="mb-3 text-sm font-semibold">Mandatory</h3> 
                <div className="flex flex-col w-full gap-6">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="title" className="text-sm">Language Spoken</label>
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="flex items-center gap-3 p-2 text-xs bg-gray-100 rounded-md">
                                English
                                <IconX size='1rem' />
                            </span>
                            <span className="flex items-center gap-3 p-2 text-xs bg-gray-100 rounded-md">
                                French
                                <IconX size='1rem' />
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="title" className="text-sm">Tools Used</label>
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="flex items-center gap-3 p-2 text-xs bg-gray-100 rounded-md">
                                Clipper
                                <IconX size='1rem' />
                            </span>
                            <span className="flex items-center gap-3 p-2 text-xs bg-gray-100 rounded-md">
                                French
                                <IconX size='1rem' />
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="title" className="text-sm">Driving License</label>
                        <Input
                            type="search"
                            placeholder="Yes"
                            className="w-full h-full py-3 bg-gray-50"
                            id="title"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="title" className="text-sm">Vehicles</label>
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="flex items-center gap-3 p-2 text-xs bg-gray-100 rounded-md">
                                Trucks
                                <IconX size='1rem' />
                            </span>
                            <span className="flex items-center gap-3 p-2 text-xs bg-gray-100 rounded-md">
                                SUV
                                <IconX size='1rem' />
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="title" className="text-sm">Personal Relevant insurance cover</label>
                        <Input
                            type="search"
                            placeholder="Yes"
                            className="w-full h-full py-3 bg-gray-50"
                            id="title"
                        />
                    </div>
                    <div className="flex justify-end">
                        <Button className="px-8 text-xs font-semibold md:px-12">
                            Update
                        </Button>
                    </div>
                </div>
            </div>
            <div className="w-full p-6 py-6 bg-white rounded-lg">
                <h3 className="mb-3 text-sm font-semibold">Go Live</h3> 
                <div className="flex flex-wrap w-full gap-3 md:gap-6">
                    <label htmlFor="verified" className="flex items-center gap-2 p-2 text-xs font-medium border rounded-md cursor-pointer md:gap-3 mdtext-sm w-fit">
                        <Checkbox
                            className="bg-gray-50"
                            id="verified"
                        />
                        Verified
                    </label>
                    <label htmlFor="restricted" className="flex items-center gap-3 p-2 text-sm font-medium border rounded-md cursor-pointer w-fit">
                        <Checkbox
                            className="bg-gray-50"
                            id="restricted"
                        />
                        Restricted
                    </label>
                    <label htmlFor="banned" className="flex items-center gap-3 p-2 text-sm font-medium border rounded-md cursor-pointer w-fit">
                        <Checkbox
                            className="bg-gray-50"
                            id="banned"
                        />
                        Banned
                    </label>
                </div>
            </div>
    </div>
  )
}

export default Compliance