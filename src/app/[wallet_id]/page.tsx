import { Wallet } from "@/components/Wallet"

interface HomepageProps {
  params: {
    wallet_id: string
  }
}

export default async function HomePage({
  params
}: HomepageProps) {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold tracking-tight">My Assets</h1>
      <Wallet walletId={params.wallet_id} />
    </div>
  )
}