'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/private/dashboard/')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs

  const { data } = await supabase.auth.signUp(
    {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    }
  )
  
  const user = data?.user
  const {error} = await supabase.from('users').insert([
    {
      user_id: user?.id,
      name: formData.get('name') as string,
      email: formData.get('email') as string,
    },
  ]);

  if(error){
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/private/dashboard/')
}