import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function GET() {
try {
    const projectRoot = process.cwd();
    const pkgPath = path.join(projectRoot, "package.json");

    const pkgRaw = fs.readFileSync(pkgPath, "utf-8");
    const pkg = JSON.parse(pkgRaw);

    const dependencies = pkg.dependencies || {};
    const devDependencies = pkg.devDependencies || {};

    const stack = {
    project: pkg.name || "unknown",
    version: pkg.version || "unknown",
    runtime: {
        node: process.versions.node,
        platform: process.platform,
        arch: process.arch,
    },
    framework: {
        next: dependencies.next || devDependencies.next || "not installed",
        react: dependencies.react || devDependencies.react || "not installed",
        "react-dom": dependencies["react-dom"] || devDependencies["react-dom"] || "not installed",
        tailwindcss: dependencies.tailwindcss || devDependencies.tailwindcss || "not installed",
        typescript: dependencies.typescript || devDependencies.typescript || "not installed",
    },
    ai_sdks: {
        "groq-sdk": dependencies["groq-sdk"] || devDependencies["groq-sdk"] || "not installed",
        openai: dependencies["openai"] || devDependencies["openai"] || "not installed",
        "@google/generative-ai": dependencies["@google/generative-ai"] || devDependencies["@google/generative-ai"] || "not installed",
    },
    tooling: {
        eslint: dependencies.eslint || devDependencies.eslint || "not installed",
        "eslint-config-next": dependencies["eslint-config-next"] || devDependencies["eslint-config-next"] || "not installed",
        "@types/node": dependencies["@types/node"] || devDependencies["@types/node"] || "not installed",
    },
    };

    return NextResponse.json({ success: true, stack });
} catch (error) {
    return NextResponse.json(
    { success: false, error: error instanceof Error ? error.message : "Unknown error" },
    { status: 500 }
    );
}
}


