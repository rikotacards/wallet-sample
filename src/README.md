# Using the App
1. Connect to the wallet using the provided options
2. You can specifcy either to send AVAX, or send USDC
3. Click next after validation passes
4. Click Send 
5. Your browser wallet will pop up to ask for approval

# Improvements
* `usePrepareTransactionRequest`, to validate if balance is enough to cover fees.
* Listen for transaction events
* Don't hardcode erc20 token list, and decimal places
* Mocking out the various wagmi hooks so we can use react testing library more reliably. Many components depends on hooks, and hence it requires mocking. 


# Component Tests

Uses Jest and React Testing Library
* run `npm test`
* We mock the wagmi library custom hooks in `__mocks__`
* We test the rendering of the hooks, to asset that it is indeed displaying what we expect. 
* `App.test.tsx` takes its mocked hooks from the `__mocks__` folder
* `ChainInfo.test.tsx` has a local mock that overrides value in the `__mocks__` folder.