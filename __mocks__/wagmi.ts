export const useAccount = jest.fn(() => ({
    isConnected: false,
    isLoading: false,
  }));

  export const useConnect = jest.fn(() => ({
    connectors: [],
    connect: jest.fn(),
  }));

  export const useDisconnect = jest.fn(() => ({
    disconnect: jest.fn()
  }))

