import {getServerSession} from "next-auth";

export default async function getCurrentUser(){
  const session = await getServerSession();

  return session?.user;
}
