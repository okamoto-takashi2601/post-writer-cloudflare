import DashboardHeader from "@/components/dashboard-header";
import DashboardShell from "@/components/dashboard-shell";
import PostCreateButton from "@/components/ui/post-create-button";
import PostItem from "@/components/ui/post-item";
import {db} from "@/lib/db";
import getCurrentUser from "@/lib/session";
import {redirect} from "next/navigation";

export default async function Dashboard() {
    const user = await getCurrentUser()
    if (!user) redirect(".login")
    const posts = await db.post.findMany({
        where: {
            authorId: user?.id
        },
        select: {
            id: true,
            title: true,
            published: true,
            createdAt: true,
        },
        orderBy: {
            updatedAt: "desc"
        }
    })
    return (
        <>
            <DashboardHeader heading={"記事投稿"} text={"気所の投稿と管理"}>
                <PostCreateButton />
            </DashboardHeader>

            <DashboardShell />
            {posts.length ? (
                <div className="divide-y border rounded-md">
                    {posts.map((post) => (
                        <PostItem key={post.id} post={post} />
                    ))}

                </div>
            ) : (
                <div className="ml-2">投稿がありません</div>
            )}
        </>
    )
}
