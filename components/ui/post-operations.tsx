"use client"
import {Post} from "@prisma/client"
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger} from "@radix-ui/react-dropdown-menu"
import {Icon} from "./icon"
import Link from "next/link"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {useState} from "react"
import {toast} from "@/hooks/use-toast"
import {useRouter} from "next/navigation"

async function deletePost(postId:string){
    try {
        const response = await fetch(`/api/posts/${postId}`,{
            method: "DELETE"
        })
        if(!response.ok) {
            throw new Error("Failed")
        }
        return true;

    } catch (error) {
        toast({
            title: "問題が発生しました",
            description: "記事の削除ができませんでした。もう一度トライしてください",
            variant: "destructive"
        })
    }
}
interface PostOperationsProps {
    post: Pick<Post, "id" | "title">
}
export default function PostOperations({post}: PostOperationsProps) {
    const router = useRouter();
    const [showDeleteAlert, setShowDeleteAlert ] = useState(false)
    const [isDeleteLoading, setIsDeleteLoading ] = useState(false)
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Icon.ellipsis className="h-4 w-4" />
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                    <DropdownMenuItem>
                        <Link href={`/editor/${post.id}`}>編集</Link>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem className="text-destructive cursor-pointer focus: text-destructive" onClick={()=>setShowDeleteAlert(true)}>
                        削除
                    </DropdownMenuItem>

                </DropdownMenuContent>
            </DropdownMenu>

            <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>

                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>本当に記事を削除しますか?</AlertDialogTitle>
                        <AlertDialogDescription>
                            この操作は取り返しができません
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>キャンセル</AlertDialogCancel>
                        <AlertDialogAction className="bg-red-600 focus:bg-gray-800" onClick={async(e)=>{
                            e.preventDefault();
                            setIsDeleteLoading(true);
                            const deleted = await deletePost(post.id);
                            if(deleted){
                                setShowDeleteAlert(false);
                                setIsDeleteLoading(false);
                            }
                            router.refresh();
                        }}>
                            {isDeleteLoading ? (<Icon.spinner className="h-4 w-4 mr-2 animate-spin"/>) : (<Icon.trash className="h-4 w-4 mr-2"/>)}
                            削除
                            </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
