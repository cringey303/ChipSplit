"use client";

import { useEffect, useState } from "react";

export function ObfuscatedMail() {
    const [email, setEmail] = useState("");

    useEffect(() => {
        // Reconstruct email on client side to avoid static scraping
        const user = "mrlucasroot";
        const domain = "gmail.com";
        setEmail(`${user}@${domain}`);
    }, []);

    if (!email) {
        return (
            <span className="cursor-pointer text-zinc-500 hover:text-foreground transition-colors hover:underline whitespace-nowrap">
                Report a Bug
            </span>
        );
    }

    return (
        <a
            href={`mailto:${email}`}
            className="text-zinc-500 hover:text-foreground transition-colors hover:underline whitespace-nowrap"
        >
            Report a Bug
        </a>
    );
}
