const secureStore = new Map<
  string,
  { username: string; secureWord: string; issuedAt: number }
>();

export default secureStore;
