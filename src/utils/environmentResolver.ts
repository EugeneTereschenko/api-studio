import type { Environment } from "../types/Environment";

export function resolveEnvironment(
    text: string,
    environment?: Environment
) {
    if (!environment) return text;

    let result = text;

    for (const variable of environment.variables) {
        result = result.replaceAll(
            `{{${variable.key}}}`,
            variable.value
        );
    }

    return result;
}