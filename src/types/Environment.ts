export interface EnvironmentVariable {
    key: string;
    value: string;
}

export interface Environment {
    id: string;
    name: string;
    variables: EnvironmentVariable[];
}