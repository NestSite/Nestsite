// import Sidebar from "../_components/sidebar";

import { cookies } from "next/headers";
// import AdminProviders from "./admin-providers";
// import { Layout, LayoutBody } from "../_components/layout";
// import { AdminPageNav } from "../_components/admin-sections";
// import { getToken } from "@/lib/get-token";
import { redirect } from "next/navigation";
import { Layout, LayoutBody } from "./_components/layout";
import { AdminPageNav } from "./_components/admin-sections";
import Sidebar from "./_components/sidebar";

export default function AdminLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	// const token = getToken();
	// if (!token) {
	// 	redirect("/admin/login");
	// }
	const layout = cookies().get("react-resizable-panels:layout");
	const collapsed = cookies().get("react-resizable-panels:collapsed");

	const defaultLayout = layout ? JSON.parse(layout.value) : [265, 440, 655];
	const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined;

	return (
		// <AdminProviders>
		<div className="relative flex flex-col md:flex-row h-full bg-background">
			{/* <ResizablePanelGroup
					direction="horizontal"
					onLayout={(sizes: number[]) => {
						document.cookie = `react-resizable-panels:layout=${JSON.stringify(
							sizes,
						)}`;
					}}
					className="h-full max-h-[800px] items-stretch"
				>
            */}
			<Sidebar
				defaultSize={defaultLayout[0]}
				navCollapsedSize={4}
				defaultCollapsed={defaultCollapsed}
			/>
			{/* <ResizableHandle withHandle /> */}

			{/* <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}> */}
			<main
				id="content"
				className={
					"overflow-x-hidden px-0 flex-1 transition-[margin] md:overflow-y-hidden md:pt-0 h-full"
				}
			>
				<Layout className="min-h-screen h-full">
					{/* ===== Top Heading ===== */}
					<AdminPageNav />

					{/* ===== Content ===== */}
					<LayoutBody className="flex flex-col bg-[#F2F2F2] h-full">{children}</LayoutBody>
				</Layout>
			</main>
			{/* </ResizablePanel>
				</ResizablePanelGroup> */}
		</div>
		// </AdminProviders>
	);
}
