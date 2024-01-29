"use client"

import { Coins, List, WalletCards } from "lucide-react";
import { useParams } from "next/navigation";
import { NavLink } from "./Nav-Link";
import { Separator } from "./ui/separator";

export function Header() {
  const params = useParams()

  return (
    <section className="border-b">
      <div className="flex h-16 items-center gap-6 px-6">
      <Coins className="h-6 w-6" />

      <Separator orientation="vertical" className="h-6" />

      <nav className="flex items-center space-x-4 lg:space-x-6">
        <NavLink href={`/${params.wallet_id}`}>
          <WalletCards className="h-4 w-4" />
          My Wallet
        </NavLink>
        <NavLink href={`#`}>
          <List className="h-4 w-4" />
          Assets
        </NavLink>
      </nav>
    </div>
  </section>
  )
}