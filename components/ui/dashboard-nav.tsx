"use client"
import {SidebarNavItem} from "@/types"
import Link from "next/link"
import {Icon as Icons} from "./icon"
import { usePathname} from "next/navigation"

interface DashboardNavProps {
    items: SidebarNavItem[]
}
export default function DashboardNav({items}: DashboardNavProps) {
    const path = usePathname()
    return (
        <nav>
            {items.map((item, index) => {
                const Icon = Icons[item.icon || "arrowRight"]
                return (
                    <Link href={item.href!} key={index} >
                        <span className={`flex items-center rounded-md px-3 py-3
                        text-sm font-medium hover:bg-accent hover:text-accent-foreground ${path === item.href ? "bg-accent" : "bg-transparent"}`}>
                            <Icon className="mr-2" />
                            {item.title}
                        </span>
                    </Link>
                )
            })}
        </nav>
    )
}
