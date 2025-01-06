

export async function POST(req: Request) {
    const { restaurantId } = await req.json();
    const response = await fetch(`/api/details/${restaurantId}`);
    return response;
}