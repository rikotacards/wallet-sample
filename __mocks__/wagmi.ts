export const useAccount = jest.fn(() => ({
    isConnected: false,
    isLoading: false,
  }));

  export const useConnect = jest.fn(() => ({
    connectors: [{name: 'connect1', uid: 1}, {name: 'connect2', uid:2}],
    connect: jest.fn(),
  }));

  export const useDisconnect = jest.fn(() => ({
    disconnect: jest.fn()
  }))

