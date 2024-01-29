import { Order } from "@/@types/models"

interface OrdersHistoryProps {
  walletId: string
}

async function getOrdersHistory(wallet_id: string): Promise<Order[]> {
  const response = await fetch(`http://localhost:8000/wallets/${wallet_id}/orders`, {
    next: {
      tags: [`orders-wallet-${wallet_id}`],
      // revalidate: isHomeBrokerClosed() ? 60 * 60 : 5 //closed = 1h | open = 5s (prod)
      revalidate: 1 // development
    }
  })
  return response.json()
}

export async function OrdersHistory({
  walletId
}: OrdersHistoryProps) {
  const walletAssets = await getOrdersHistory(walletId) ?? []

  return (
    <ul>
      {walletAssets?.map((order) => (
        <li key={order.id}>
          {order.status} - {order.type} - {order.Asset.id} - {order.Asset.symbol} - {order.shares} - USD$ {order.price}
        </li>
      ))}
    </ul>
  )
}