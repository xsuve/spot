export const jobIDParser = (
  url: string
)  => {
  const match = url.match(/\/jobs\/view\/(\d{10})/);
  if (match === null) {
    return null;
  }

  return match[1];
};