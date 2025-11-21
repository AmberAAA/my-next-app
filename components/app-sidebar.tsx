import * as React from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { verifySession } from "@/lib/session";
import Link from "next/link";

// This is sample data.
const data = {
  navMain: [
    {
      title: "TODO TABLE",
      url: "/todo",
      active: true
    },
  ]
}

export async function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = await verifySession();
  return (
    <Sidebar {...props}>
      <SidebarContent>
        <SidebarHeader className="flex justify-end items-center h-[56px] border-b">
          <Link className="" href="/logout">HI {user?.email}</Link>
        </SidebarHeader>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a href={item.url} className="font-medium">
                    {item.title}
                  </a>
                </SidebarMenuButton>
                {/* {item.items?.length ? (
                  <SidebarMenuSub>
                    {item.items.map((item) => (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton asChild isActive={item.isActive}>
                          <a href={item.url}>{item.title}</a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null} */}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
