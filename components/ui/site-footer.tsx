import {siteConfig} from "@/config/site";
import Link from "next/link";

export default function SiteFooter() {
    return (
        <footer>
            <div className="container py-10 md:py-0 md:h-24">
                <p className="text-center text-muted-foreground text-sm md:text-left">
                    Built by {""} 
                    <Link href={siteConfig.links.x} className="underline underline-offset-4 font-medium" target="_blank" rel="noreferrer">OkaCode</Link>
                    . Hosted on {""}
                    <Link href={"www.vercel.com"} className="underline underline-offset-4 font-medium" target="_blank" rel="noreferrer">Vercel</Link>
                </p>
            </div>
        </footer>
    )
}
