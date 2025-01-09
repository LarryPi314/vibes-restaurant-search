import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const supabase = await createClient();

    const { restaurantId, isFavorited } = await req.json();
    
    console.log("SHREK POST favorites", restaurantId);
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    if (!isFavorited){
      const { error } = await supabase
        .from('favorites')
        .insert([
          { user_id: user.id, restaurant_id: restaurantId }
        ]);

      if (error) throw error;
    } else {
      const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('user_id', user.id)
        .eq('restaurant_id', restaurantId);

      if (error) throw error
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Favorite error:', error);
    return NextResponse.json(
      { error: 'Failed to add favorite' },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    
    console.log("SHREK GET favorites", user === null);

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const { data: favorites, error } = await supabase
      .from('favorites')
      .select('restaurant_id')
      .eq('user_id', user.id);

    if (error) throw error;

    const { data: restaurants, error: restaurant_error } = await supabase
      .from('restaurants')
      .select('*')
      .in('restaurant_id', favorites.map(favorite => favorite.restaurant_id));

    if(restaurant_error) throw restaurant_error;
    
    console.log(favorites)
    console.log("Hello Shrek")

    return NextResponse.json({ restaurants });
  } catch (error) {
    console.error('Get favorites error:', error);
    return NextResponse.json(
      { error: 'Failed to get favorites' },
      { status: 500 }
    );
  }
}