import initialize from "../src/initialize";
export const initTests = async (): Promise<void> => {
  await new Promise<void>((resolve) => {
    initialize(resolve);
  });
};
