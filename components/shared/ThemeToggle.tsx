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
        <Toggle className="">
            {!isLight ? (
                <Sun
                    onClick={enableLightMode}
                    className="transition ease-in-out hover:scale-105"
                />
            ) : (
                <Moon
                    onClick={enableDarkMode}
                    className="transition ease-in-out hover:scale-105"
                />
            )}
        </Toggle>
    );
};

export { ThemeToggle };