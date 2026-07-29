import type { Environment, EnvironmentVariable } from "../types/Environment";

export function resolveEnvironment(
    text: string,
    variables: EnvironmentVariable[]
): string {

    let result = text;

    variables.forEach(variable => {
        result = result.replaceAll(
            `{{${variable.key}}}`,
            variable.value
        );
    });

    return result;
}