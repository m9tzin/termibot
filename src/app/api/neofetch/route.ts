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
    project: pkg.name || "termibot",
    version: pkg.version || "0.1.3",
    runtime: {
        node: process.versions.node,
        platform: process.platform,
        arch: process.arch,
    },
    framework: {
        next: dependencies.next || devDependencies.next || "15.5.4",
        react: dependencies.react || devDependencies.react || "19.1.0",
        "react-dom": dependencies["react-dom"] || devDependencies["react-dom"] || "19.1.0",
        tailwindcss: dependencies.tailwindcss || devDependencies.tailwindcss || "4",
        typescript: dependencies.typescript || devDependencies.typescript || "5",
    },
    ai_sdks: {
        "groq-sdk": dependencies["groq-sdk"] || devDependencies["groq-sdk"] || "0.33.0",
        openai: dependencies["openai"] || devDependencies["openai"] || "6.0.0",
        "@google/generative-ai": dependencies["@google/generative-ai"] || devDependencies["@google/generative-ai"] || "0.24.1",
    },
    tooling: {
        eslint: dependencies.eslint || devDependencies.eslint || "9",
        "eslint-config-next": dependencies["eslint-config-next"] || devDependencies["eslint-config-next"] || "15.5.4",
        "@types/node": dependencies["@types/node"] || devDependencies["@types/node"] || "20",
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


