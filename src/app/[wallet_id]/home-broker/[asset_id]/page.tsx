import { OrdersHistory } from "@/components/OrdersHistory"
import { OrderForm } from "@/components/order-form/OrderForm"

interface HomeBrokerPageProps {
  params: {
    wallet_id: string
    asset_id: string
  }
}

export default async function HomeBrokerPage({
  params
}: HomeBrokerPageProps) {

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold tracking-tight">Home broker</h1>

      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex flex-col md:flex-row lg:flex-col">
          <div className="w-[360px]">
            <OrderForm assetId={params.asset_id} walletId={params.wallet_id} type="BUY"/>
          </div>
          <div>
            <OrdersHistory walletId={params.wallet_id} />
          </div>
        </div>
        <div>chart</div>
      </div>
    </div>
  )
}