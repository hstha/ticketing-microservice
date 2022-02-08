export const stringify = <T>(data: T): string => JSON.stringify(data);

export const parse = <T>(data: string): T => JSON.parse(data);

export const clone = <T>(data: T): T => parse(stringify(data));
