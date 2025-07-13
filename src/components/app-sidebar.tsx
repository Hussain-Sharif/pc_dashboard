"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  HeartIcon,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  TrendingUp,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { useContent } from "@/hooks/useContent"


// This is sample data.
const data = {
  user: {
    name: "Sharif",
    email: "sharif@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "PCD-Personalized",
      logo: GalleryVerticalEnd,
      plan: "Content Dashboard",
    },
  ],
  navMain: [
    {
      title: "My Feed",
      url: "/myfeed",
      icon: Frame,
      type:'personalized',
      
     
    },
    {
      title: "Trending",
      url: "/trending",
      icon: TrendingUp,
      type:'trending',
    
    },
    {
      title: "Favorites",
      url: "/favorites",
      icon: HeartIcon,
      type:'favorites',
  
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const {switchSection,content}=useContent()
 
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} switchSection={switchSection} content={content} />
      </SidebarContent>
      <SidebarFooter>
        
        <NavUser user={data.user} />
      </SidebarFooter>
      
      <SidebarRail />
    </Sidebar>
  )
}
