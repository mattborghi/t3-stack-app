export default function Home() {
  return (
    <div className="h-screen w-screen flex flex-col justify-center">
      <div className="text-2xl text-center">Which Pokemon is rounder?</div>
      <div className="p-2"/>
      <div className="border rounded p-8 flex justify-evenly items-center max-w-2-xl">
        <div className="w-16 h-16 bg-red-200" />
        <div className="p-8" >vs</div>
        <div className="w-16 h-16 bg-red-200" />
        </div>
    </div>
  )
}
