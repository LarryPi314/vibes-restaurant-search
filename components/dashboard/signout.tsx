'use client'
import { createClient } from '@/utils/supabase/client'
import { Button } from '@/components/ui/button'
import { redirect, useRouter } from 'next/navigation'
export default function Signout() {
    const supabase = createClient()
    const router = useRouter()
    const signout = async function (){
        const { error } = await supabase.auth.signOut();
        router.push('/');
    }
    return (
        <div className="fixed top-0 right-0 mt-7 mr-7 p-3">
        <Button onClick={signout}>Sign Out</Button>
        </div>
    )
}


