import tools from './tools.json';

interface Tool {
    name: string;
    description: string;
    contributors: string[];
}

interface Meta {
    title: string;
    description: string;
    contributors: string[];
}

interface Route {
    id: string;
}

interface Url {
    pathname: string;
}

export async function load({ route, url }: { route: Route; url: Url }) {
    try {
        const meta = getMeta(route, url);
        return {
            tools,
            meta,
        };
    } catch (error) {
        console.error('Error loading data:', error);
        return {
            tools,
            meta: null,
        };
    }
}

function getMeta(route: Route, url: Url): Meta | null {
    if (route.id && route.id.includes("(tools)")) {
        const toolId = url.pathname.replace("/", "");
        const tool: Tool | undefined = tools[toolId];
        
        if (tool) {
            return {
                title: tool.name,
                description: tool.description,
                contributors: tool.contributors,
            };
        } else {
            console.warn(`Tool with ID ${toolId} not found`);
        }
    }
    return null;
}
