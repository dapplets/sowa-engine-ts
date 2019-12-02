# ToDo List
!! 0. BIG: implement formatters/view/renderer AddressHtmlFormatter.ts
!! 1. BIG: ethTxBuilder:53: add EthSigner Event "Tx_CREATED" "Tx_" write transaction hash into State.
!! 2. DIFFICULT: Think about chain REORGs
!! 3. Must be State=>Storage? What if Wallet switches off between transactions?

0. More Specific Name for State. ExecutableState is too long?
1. DappletTemplate: transform views declaration from array to object, where object's properties is a type of views.
2. Check and clean implement GUIDd und IDs inclusive aliaces and URL to docs. With semantical hierarhy and version support.
3. import paths may be better? (no "../../..")
4. events: what DappletEngine delivers to browser and what he delivers internally (to history view?)
5. state.ts:35 what should be validate: JavascriptType or CBORtype?
6. state.ts:77 formatters/converters/built-ins 
