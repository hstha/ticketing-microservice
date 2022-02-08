export const isEnvPresent = (values: string[]) =>
  values.every((value) => !!process.env[value]);
