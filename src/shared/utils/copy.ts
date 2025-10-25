export const Copy = async (
  text: string,
  onSuccess?: () => void,
  onError?: (error: unknown) => void
) => {
  try {
    await navigator.clipboard.writeText(text);
    onSuccess?.();
  } catch (err) {
    onError?.(err);
  }
};
