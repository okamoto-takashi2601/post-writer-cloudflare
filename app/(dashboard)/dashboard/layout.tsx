import DashboardNav from "@/components/ui/dashboard-nav";
import MainNav from "@/components/ui/main-nav";
import SiteFooter from "@/components/ui/site-footer";
import {dashboardConfig} from "@/config/dashboard";


export default function DashboardLayout({children}: {children: React.ReactNode}) {
    return (
        <div className="flex min-h-screen flex-col space-y-6 mx-5">
            <header className="sticky top-0 z-40 border-b bg-background">
                <div className="container flex items-center justify-between py-4">
                    <MainNav items={dashboardConfig.mainNav} />
                </div>
            </header>
            <div className="container grid flex-1 gap-12 md:grid-cols-[300px_1fr]">
                <aside className="hidden md:flex w-[200px]">
                    <DashboardNav items={dashboardConfig.sidebarNav}/>
                </aside>
                <main className="flex flex-col w-full flex-1 overflow-hidden">{children}</main>
            </div>
            <SiteFooter />
        </div>
    )
}
