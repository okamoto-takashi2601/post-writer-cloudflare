"use client"
import {cn} from "@/lib/utils";
import {buttonVariants,ButtonProps} from "./button";
import {useState} from "react";
import {Icon} from "./icon";
import {useRouter} from "next/navigation";
import { ToastAction } from "@/components/ui/toast"
import {useToast} from "@/hooks/use-toast";

interface PostCreateButtonProps extends ButtonProps {}
export default function PostCreateButton({className, variant, ...props}: PostCreateButtonProps) {
    const { toast } = useToast()

    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false);

    const onclick = async () =>{
        setIsLoading(true);
        const responce = await fetch("api/posts",{
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify({
                title : "Untitled Post"
            })
        })
        setIsLoading(false);
        if(!responce.ok){
            return toast({
                title : "問題が発生しました",
                description : "投稿が作成されませんでした。もう一度トライしてください",
                variant : "destructive"
            })
        }
        const post = await responce.json();
        router.push(`editor/${post.id}`)
    }


    return (
        <button className={cn(buttonVariants(), {"cursor-not-allowed opacity-60": isLoading },className)} onClick={onclick} disabled={isLoading} {...props} >
            {isLoading ? <Icon.spinner className="animate-spin mr-2 h-4 w-4"/> : <Icon.add  className="mr-2 h-4 w-4"/>}
            新しい投稿
        </button>
    )
}
