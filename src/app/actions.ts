"use server"

import { deleteuser } from "@/data-access/users"
import { getSession } from "@/lib/auth"



export async function deleteaccountaction(){
    const session=await getSession()

    if(!session){
        throw new Error("you must be login to delete the account")
    }
    await deleteuser(session.user.id)
}