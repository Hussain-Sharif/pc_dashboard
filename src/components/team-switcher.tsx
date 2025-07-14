"use client"

import * as React from "react"
import { ChevronsUpDown } from "lucide-react"


import {
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { useContent } from "@/hooks/useContent"
import NexusLogo from "../../public/assests/nexus_favicon.png"
import Image from "next/image"

export function TeamSwitcher({
  teams,
}: {
  teams: {
    name: string
    plan: string
  }[]
}) {
  const [activeTeam, setActiveTeam] = React.useState(teams[0])
  const {switchSection}=useContent()

  if (!activeTeam) {
    return null
  }

  return (
    <Link href={`/myfeed`}  onClick={() => switchSection('personalized')}>
    <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
                <div className="bg-sidebar-foreground text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <Image src={NexusLogo} alt="logo" className="size-5" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{activeTeam.name}</span>
                <span className="truncate text-xs">{activeTeam.plan}</span>
              </div>
            
            </SidebarMenuButton>
        </Link>
  )
}
