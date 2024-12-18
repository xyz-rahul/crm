import React, { ReactNode } from 'react'
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"

import {
    SidebarFooter,
    SidebarHeader,
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
// Menu items.
const items = [
    {
        title: "Home",
        url: "/",
        icon: Home,
    },
    {
        title: "Leads",
        url: "/leads",
        icon: Inbox,
    },
    {
        title: "User",
        url: "/user",
        icon: Calendar,
    },
    // {
    //     title: "Search",
    //     url: "#",
    //     icon: Search,
    // },
]


export default function AppSidebar() {
    return (
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <a href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
    )
}

