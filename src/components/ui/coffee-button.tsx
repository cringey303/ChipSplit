"use client"

import { Coffee } from "lucide-react"
import { Button } from "./button"

export function CoffeeButton() {
    return (
        <Button
            asChild
            variant="ghost"
            size="sm"
            className="w-auto px-3 md:w-9 md:hover:w-[160px] md:px-0 md:transition-[width] md:duration-300 md:ease-in-out md:overflow-hidden group gap-2 md:gap-0 text-amber-600 hover:bg-amber-700 hover:text-amber-300"
        >
            <a
                href="https://ko-fi.com/lucasroot"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full"
            >
                <Coffee className="h-5 w-5 flex-shrink-0" />

                {/* Mobile/Tablet text */}
                <span className="md:hidden font-medium">Support</span>

                {/* Desktop hover text */}
                <span className="hidden md:block max-w-0 group-hover:max-w-full opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out ml-0 group-hover:ml-2 whitespace-nowrap overflow-hidden">
                    Buy me a coffee
                </span>
            </a>
        </Button>
    )
}
