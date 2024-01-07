import { WalletAsset } from "@/@types/models"
import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"

interface HomepageProps {
  walletId: string
}

async function getWalletAssets(wallet_id: string): Promise<WalletAsset[]> {
  const response = await fetch(`http://localhost:8000/wallets/${wallet_id}/assets`, {
    next: {
      // revalidate: isHomeBrokerClosed() ? 60 * 60 : 5 //closed = 1h | open = 5s (prod)
      revalidate: 1 // development
    }
  })
  return response.json()
}

export async function Wallet({
  walletId
}: HomepageProps) {
  const walletAssets = await getWalletAssets(walletId) ?? []

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Asset</TableHead>
            <TableHead>Price USD$</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>
              <span className="sr-only">Buy/Sell</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {walletAssets?.map((walletAsset) => (
          <TableRow key={`${walletAsset.id}-${walletAsset.Asset.id}`}>
            <TableCell className="whitespace-nowrap font-medium">{walletAsset.Asset.symbol}</TableCell>
            <TableCell>{walletAsset.Asset.price}</TableCell>
            <TableCell>{walletAsset.shares}</TableCell>
            <TableCell>
            <Link
                className="font-medium hover:underline text-cyan-500"
                href={`/${walletId}/home-broker/${walletAsset.Asset.id}`}
              >
                Comprar/Vender
              </Link>
            </TableCell>
          </TableRow>
        ))}
          
        </TableBody>
      </Table>
      <ul>
      
    </ul>
    </div>
  )
}