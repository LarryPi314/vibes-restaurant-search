'use client'
import { createClient } from '@/utils/supabase/client'
import { Button } from '@/components/ui/button'
import { redirect } from 'next/navigation'

export default function Signout() {
    const supabase = createClient()

    const signout = async function (){
        const { error } = await supabase.auth.signOut()
        redirect('/')
    }
    return (
        <div className="fixed top-0 right-0 mt-6 mr-6 p-4">
        <Button onClick={signout}>Sign Out</Button>
        </div>
    )
}


