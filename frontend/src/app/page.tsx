import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <text className="mb-2" style={{ fontFamily: "var(--font-geist-mono)"}}>
          Finding the juciest birria tacos 🌮 should be easy. Enter your cravings and let's find the perfect spot for you.
          </text>
          <input type="text" className="rounded-input" placeholder="Viral birria taco spot with free drinks"></input>         
          
        </ol>
      </main>
    </div>
  );
}
