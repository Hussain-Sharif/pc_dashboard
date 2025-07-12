"use client"

import { ChevronRight, type LucideIcon } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import Link from "next/link"

export function NavMain({
  items,
  switchSection,
  content
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    type: string
  }[],
  switchSection: (section: string) => void,
  content: any
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>We Offer You </SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const isActive=item.type === content.currentSection

          return (
          
            <SidebarMenuItem  key={item.title}
            className={isActive ? "bg-sidebar-accent rounded-md" : ""}
            >
               <Link href={item.url} onClick={() => switchSection(item.type)}>
                 <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  
                </SidebarMenuButton>
               </Link>
            </SidebarMenuItem>
    
        )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
