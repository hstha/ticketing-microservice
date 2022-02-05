export const isEnvPresent = (values: string[]) =>
  values.some((value) => !!process.env[value]);
