import { useLocation, Link } from "react-router-dom";
import { categories, getCalculatorsByCategory, type CategoryId } from "@/data/calculators";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Home } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="pt-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link
                to="/"
                className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${location.pathname === "/" ? "bg-accent text-accent-foreground font-medium" : "hover:bg-muted"}`}
              >
                <Home className="h-4 w-4 shrink-0" />
                {!collapsed && <span>Home</span>}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        {categories.map(cat => (
          <CategoryGroup key={cat.id} category={cat} collapsed={collapsed} currentPath={location.pathname} />
        ))}
      </SidebarContent>
    </Sidebar>
  );
}

function CategoryGroup({ category, collapsed, currentPath }: { category: typeof categories[0]; collapsed: boolean; currentPath: string }) {
  const calcs = getCalculatorsByCategory(category.id);
  const isActive = calcs.some(c => c.path === currentPath);
  const [open, setOpen] = useState(isActive);

  if (collapsed) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link
              to={`/category/${category.id}`}
              className={`flex items-center justify-center p-2 rounded-md transition-colors ${isActive ? "bg-accent text-accent-foreground" : "hover:bg-muted"}`}
              title={category.name}
            >
              <category.icon className="h-4 w-4 shrink-0" />
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <SidebarGroup>
        <CollapsibleTrigger className="w-full">
          <SidebarGroupLabel className="flex items-center justify-between cursor-pointer hover:bg-muted/50 rounded-md px-2 py-1 transition-colors">
            <span className="flex items-center gap-2">
              <category.icon className="h-3.5 w-3.5" />
              {category.name}
            </span>
            <ChevronRight className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-90" : ""}`} />
          </SidebarGroupLabel>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarGroupContent>
            <SidebarMenu>
              {calcs.filter(c => c.implemented).map(calc => (
                <SidebarMenuItem key={calc.id}>
                  <SidebarMenuButton asChild>
                    <Link
                      to={calc.path}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors ${currentPath === calc.path ? "bg-accent text-accent-foreground font-medium" : "hover:bg-muted text-sidebar-foreground"}`}
                    >
                      <calc.icon className="h-3.5 w-3.5 shrink-0" />
                      <span className="truncate">{calc.name.replace(" Calculator", "").replace(" Converter", "")}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  );
}
