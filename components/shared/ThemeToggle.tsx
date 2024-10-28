"use client";

import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import {Toggle} from "@/components/ui/toggle";

const ThemeToggle = () => {
    const [isLight, setIsLight] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        if (theme === "light") {
            setIsLight(true);
            setTheme("light");
        }
    }, [setTheme, theme]);

    const enableLightMode = () => {
        setTheme("light");
        setIsLight(true);
    };

    const enableDarkMode = () => {
        setTheme("dark");
        setIsLight(false);
    };

    return (
        <Toggle className="rounded-full p-1">
            {!isLight ? (
                <Sun
                    onClick={enableLightMode}
                    className="transition ease-in-out hover:rotate-45"
                />
            ) : (
                <Moon
                    onClick={enableDarkMode}
                    className="transition ease-in-out hover:rotate-45"
                />
            )}
        </Toggle>
    );
};

export { ThemeToggle };