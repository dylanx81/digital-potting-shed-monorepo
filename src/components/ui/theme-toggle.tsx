"use client";

import * as React from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="h-10 w-10 rounded-full border-2 border-earth-200 dark:border-earth-700 bg-white/90 dark:bg-earth-800/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-earth-700 dark:text-earth-300" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-earth-700 dark:text-earth-300" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white/95 dark:bg-earth-800/95 backdrop-blur-sm border border-earth-200 dark:border-earth-700 shadow-xl">
        <DropdownMenuItem onClick={() => setTheme("light")} className="text-earth-700 dark:text-earth-300 hover:bg-earth-100 dark:hover:bg-earth-700">
          <Sun className="mr-2 h-4 w-4" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")} className="text-earth-700 dark:text-earth-300 hover:bg-earth-100 dark:hover:bg-earth-700">
          <Moon className="mr-2 h-4 w-4" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")} className="text-earth-700 dark:text-earth-300 hover:bg-earth-100 dark:hover:bg-earth-700">
          <Monitor className="mr-2 h-4 w-4" />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
