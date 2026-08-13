import type { Environment } from "../types/Environment";

export function resolveEnvironment(
    value: string,
    environment?: Environment
): string {
    if (!environment) {
        return value;
    }

    let result = value;

    for (const variable of environment.variables) {
        const placeholder = `{{${variable.key}}}`;

        result = result.replaceAll(
            placeholder,
            variable.value
        );
    }

    return result;
}