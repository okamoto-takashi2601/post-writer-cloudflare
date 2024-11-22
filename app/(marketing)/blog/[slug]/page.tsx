import {allPosts} from "@/.contentlayer/generated"
import {notFound} from "next/navigation";
import {format} from "date-fns";
import Image from "next/image";
import Link from "next/link";
import {cn} from "@/lib/utils";
import {buttonVariants} from "@/components/ui/button";
import Mdx from "@/components/ui/Mdx";
import {Metadata} from "next";
import {siteConfig} from "@/config/site";

async function getPostFromSlug(slug: string) {
    const post = allPosts.find((post) => post.slugAsPramams === slug);
    return post;
}

export async function generateMetadata({params}: {params: {slug: string}}): Promise<Metadata> {
    const page = await getPostFromSlug(params.slug);
    if (!page) return {}

    return (
        {
            title: page.title,
            description: page.description,
            openGraph: {
                type: "article",
                locale: "ja",
                url: siteConfig.url,
                title: page.title,
                description: page.description,
                siteName: siteConfig.name
            },
            twitter: {
                card: "summary_large_image",
                title: siteConfig.name,
                description: siteConfig.description,
                images: [`${siteConfig.url}/og.jpg`],
                creator: "@okacode"
            },

        }
    )
}

export default async function PostPage({params}: {params: {slug: string}}) {
    const slug = params.slug;
    const post = await getPostFromSlug(slug);

    if (!post) notFound();

    return (
        <article>
            <div>
                {post.date && (<time>Published on {format(post.date, "yyyy-mm-dd")} </time>)
                }
                <h1 className="mt-2 font-extrabold text-4xl lg:text-5xl leading-tight">{post.title}</h1>
            </div>
            {post.image && (
                <Image src={post.image} alt={post.title} width={720} height={405}></Image>
            )}

            <Mdx code={post.body.code} />

            <hr className="mt-12" />
            <div className="py-6 text-center lg:py-10">
                <Link className={cn(buttonVariants({variant: "secondary"}))} href={"/blog"}>すべての記事をみる</Link>
            </div>

        </article>
    )
}
