import {allPosts} from "@/.contentlayer/generated"
import Image from "next/image";
import {format} from "date-fns";
import Link from "next/link";

export default function BlogPage() {
    const posts = allPosts;
    return (
        <div className="container max-w-4xl py-6 lg:py-10">
            <div className="space-y-4">
                <h1 className="font-extrabold text-4xl lg:text-5xl tracking-tighter">Blog</h1>
                <p className="text-muted-foreground text-xl">ContentLayerとMDXで書く</p>
                <hr className="my-8" />
                <div className="grid  sm:grid-cols-2 gap-10">

                    {posts.map((post) => (
                        <article key={post._id} className="relative">
                            {post.image && <Image src={post.image} alt={post.title} width={804} height={402} className="rounded-md border bg-muted"></Image>}
                            <h2 className="text-2xl font-extrabold">{post.title}</h2>
                            <p className="text-sm text-muted-foreground">{post.description}</p>
                            <p className="text-sm text-muted-foreground">{format(post.date, "yyyy/mm/dd")}</p>
                            <Link href={post.slug} className="absolute inset-0"></Link>
                        </article>
                    ))}
                </div>

            </div>
        </div>
    )
}
