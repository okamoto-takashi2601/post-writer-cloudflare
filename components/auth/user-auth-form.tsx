"use client"

import {Label} from "../ui/label";
import {Input} from "../ui/input"
import {Button, buttonVariants} from "../ui/button"
import {cn} from "@/lib/utils";
import {Icon} from "../ui/icon";
import {signIn} from "next-auth/react"
import {useState} from "react";

export default function UserAuthForm() {
    const [isGithubLoading, setIsGithubLoading] = useState(false)
    const [isGoogleLoading, setIsGoogleLoading] = useState(false)
    return (
        <div className="grid gap-6">
            <form>
                <div className="grid gap-2">
                    <div className="grid gap-1">
                        <Label htmlFor="email">メールアドレス</Label>
                        <Input id="email" placeholder="name@example.com" type="email" />
                    </div>
                    <Button>メールアドレスでログイン</Button>
                </div>
            </form>
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t"></span>
                </div>
                <div className="relative flex justify-center text-xs">
                    <span className="text-muted-foreground px-2 bg-background">or</span>
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <Button className={cn(buttonVariants({variant: "outline"}), "text-indigo-950")} onClick={() => {
                    setIsGithubLoading(true);
                    signIn("github")
                }
                }>
                    {isGithubLoading ?
                        (
                            <Icon.spinner className="animate-spin mr-2" />
                        ) : (
                            <Icon.github className="mr-2" />
                        )
                    }

                    Github
                </Button>

                <Button className={cn(buttonVariants({variant: "outline"}), "text-indigo-950")} onClick={() => {
                    setIsGoogleLoading(true);
                    signIn("google")
                }
                }>
                    {isGoogleLoading ?
                        (
                            <Icon.spinner className="animate-spin mr-2" />
                        ) : (
                            <Icon.google className="mr-2" />
                        )
                    }

                    Google
                </Button>

            </div>
        </div>
    )
}
