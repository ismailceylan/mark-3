# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.0.11](https://github.com/ismailceylan/mark-3/compare/v0.0.10...v0.0.11) (2026-01-27)


### Features

* **cliparts:** add exports for various clipart components ([b1535a1](https://github.com/ismailceylan/mark-3/commit/b1535a1033ad80321cccd962bc3ee6b2a0af2ac8))
* **components:** add has-scrollbar ref to virtual-scroll component ([5d9ecb4](https://github.com/ismailceylan/mark-3/commit/5d9ecb4086e43ade7b4afd43e36fd995fdb9c2c9))
* **components:** add new heat meter component ([3d75c56](https://github.com/ismailceylan/mark-3/commit/3d75c56194f6c2619c16d7791b9f7e612caecf0d))
* **composables:** add new use-storage composable ([83d40e1](https://github.com/ismailceylan/mark-3/commit/83d40e1dfb6fe32b02ed7e47c79333bab1adc15f))
* **composables:** use-swipeable-drawer exports swipePercent computed ([9066322](https://github.com/ismailceylan/mark-3/commit/90663226f6cffcc6e6331e126e56f56525812301))
* **countdown:** add useCountdown composable for countdown functionality ([4e7d617](https://github.com/ismailceylan/mark-3/commit/4e7d61753148afbc958fc60bc90b5841e21aa958))
* **empty-document:** add new EmptyDocument clipart component ([a67797d](https://github.com/ismailceylan/mark-3/commit/a67797dde63d22c43fb681e894a2592fce47e2ab))
* **error-404:** add Error404 clipart component with SVG paths and props ([70a3306](https://github.com/ismailceylan/mark-3/commit/70a3306f5002b4e1ac51e161e43d5eb73396d5c6))
* **helpers:** add new concurrency/leadership method ([b844c99](https://github.com/ismailceylan/mark-3/commit/b844c998ec30f7d85731ffe927b391ba53dd3f31))
* **helpers:** add new trimCustom method ([0f6a7de](https://github.com/ismailceylan/mark-3/commit/0f6a7dee70fd6b4adf544e66b8f24195aad61467))
* **image-sizes:** add useImageSizes composable for image dimensions ([98231f5](https://github.com/ismailceylan/mark-3/commit/98231f519cd759609330b89c6d8bcb684b3d8768))
* **my-answer:** add new SVG clipart component with customizable props ([b616c9b](https://github.com/ismailceylan/mark-3/commit/b616c9b40ff1a93169c67d55bf34db6828e7e6a9))
* **offline-shore:** add OfflineShore SVG clipart component with customizable props ([d55cc14](https://github.com/ismailceylan/mark-3/commit/d55cc14ad33ebeb3a1e0e41fdec3fca8edf32787))
* **publish-post:** add PublishPost SVG clipart component with customizable props ([64843be](https://github.com/ismailceylan/mark-3/commit/64843be38a3fe64cc87d17d867f945b82fac7a72))
* **seconds-to-timestamp:** add helper function to convert seconds to human-readable timestamp ([773e326](https://github.com/ismailceylan/mark-3/commit/773e3262ced83ff647e9cf88c4b895b6bb689ad6))
* **separated-otp-inputs:** add useSeparatedOTPInputs composable for managing separated OTP inputs ([2d46a16](https://github.com/ismailceylan/mark-3/commit/2d46a1600c2508d01e7ec1b256ceaf98b0371b8a))
* **server-clipart:** add Server SVG clipart component with customizable props ([2a7ecf6](https://github.com/ismailceylan/mark-3/commit/2a7ecf6f42ee5faa49a06376a247d872c158ff46))
* **split:** implement split function for text preview and remaining content ([7963440](https://github.com/ismailceylan/mark-3/commit/79634407dcabd5026c9578ed6244803d822ce806))
* **types:** reintroduce type-checking helpers for array, map, set, and string ([5a78956](https://github.com/ismailceylan/mark-3/commit/5a78956971cead010e25c2d7d4dcaaa3f0ffa562))
* **under-construction:** add UnderConstruction SVG clipart component with customizable props ([576d55e](https://github.com/ismailceylan/mark-3/commit/576d55eb8d2baed9a403ed11e5ccc2e9431e1148))
* **use-image-sizes:** include isLoaded state in return values ([17965d3](https://github.com/ismailceylan/mark-3/commit/17965d320fe1bbc8c4cdddbbd3bdf40ca4d5301b))
* **use-pointer-swipe:** add pointerleave event listener to handle swipe end ([97bad0c](https://github.com/ismailceylan/mark-3/commit/97bad0c1bb4ed99255b91b632e7b96a89fdb806d))
* **virtual-scroll:** add re-measure functionality for item heights ([41526b9](https://github.com/ismailceylan/mark-3/commit/41526b9949d21f0ac95e0fb81ac300b747a129a5))
* **virtual-scroll:** allow customizable tag for container element ([a3ac253](https://github.com/ismailceylan/mark-3/commit/a3ac253464caed184bd04b363e7cdf30bc26ceba))


### Bug Fixes

* **components:** only listen to actual screen width changes in virtual-scroll ([a260f1f](https://github.com/ismailceylan/mark-3/commit/a260f1fdf47f936e5368cce2021e090a0eb35f6c))
* **components:** prevent threshold-reached event from triggering with insufficient items ([ea618a6](https://github.com/ismailceylan/mark-3/commit/ea618a6d74b36c83e56feba821e164b15c30e96b))
* **from-timestamp:** handle null input and return default value ([556684c](https://github.com/ismailceylan/mark-3/commit/556684c49fb71844b75e178cffc7aa5bfed3a6f0))
* **use-image-sizes:** initialize width and height to default values ([8a24039](https://github.com/ismailceylan/mark-3/commit/8a2403976b154e204979057cd21b5d0593e3d722))
* **use-resize-observer:** update parameter type in ObserveMethod callback documentation ([24db5ec](https://github.com/ismailceylan/mark-3/commit/24db5ec61ec7f9e31c24dd8cea277f2cce2586b7))
* **virtual-scroll:** improve item height measurement logic in visibleItems watcher ([415eded](https://github.com/ismailceylan/mark-3/commit/415eded77c7fa041d8ecb13a9a2114cf358d4d4d))
* **virtual-scroll:** initialize latestWidth with window.innerWidth for accurate resizing ([7c8e5c1](https://github.com/ismailceylan/mark-3/commit/7c8e5c132f07ad4d085b3efe6fd6d409929424be))
* **virtual-scroll:** use nextTick for scrollbar height check after container updates ([292ecfc](https://github.com/ismailceylan/mark-3/commit/292ecfcfb67a73725365c0d565cf805359ce6635))

### [0.0.10](https://github.com/ismailceylan/mark-3/compare/v0.0.9...v0.0.10) (2025-09-19)


### Features

* **composables:** add new use-timeout composable ([e55c99b](https://github.com/ismailceylan/mark-3/commit/e55c99becb211c006b853682d699b6df543c3bf0))
* **composables:** add persistent option for the use-event-listener composable ([3361183](https://github.com/ismailceylan/mark-3/commit/3361183e77ac2a3842834efabfe2ea057d890ddf))
* **composables:** add persistent option for the use-media-query composable ([1cbff8f](https://github.com/ismailceylan/mark-3/commit/1cbff8f6d92fe9a08a73840789261552eecfdd03))
* **helpers:** add new date/seconds-remaining helper ([0404d06](https://github.com/ismailceylan/mark-3/commit/0404d066f8240152a3a4aa25ee49129549636983))


### Bug Fixes

* **composables:** reattach the events when ref-type elements are reassigned ([dde2c85](https://github.com/ismailceylan/mark-3/commit/dde2c85039b69bb6ca75f88334c9d5d81664c08f))
* **helpers:** correct from-timestamp filename without affecting exports ([15273cb](https://github.com/ismailceylan/mark-3/commit/15273cb7ade8be17a5dda74d8402dbd1f1371b5c))
* **helpers:** correct is-on-same-day filename without affecting exports ([015b92a](https://github.com/ismailceylan/mark-3/commit/015b92ada54f67fb7d529b92c084f0e82d744f0a))

### [0.0.9](https://github.com/ismailceylan/mark-3/compare/v0.0.8...v0.0.9) (2025-08-30)


### Features

* **components:** add an option to ignore window size changes in virtual-scroll component ([2e27806](https://github.com/ismailceylan/mark-3/commit/2e2780680718824df973d050b109cf81ef657dc5))
* **components:** add support for two-way top scroll determination using the v-model method for virtual-scroll component ([123c89e](https://github.com/ismailceylan/mark-3/commit/123c89e6cc216305ac7d66e2c8d961d50cc7aaad))
* **helpers:** add new chunk method for arrays ([9150623](https://github.com/ismailceylan/mark-3/commit/9150623b9194830b5699c0863e8313fcde21c3d3))
* **helpers:** add new number/compact helper ([6d40850](https://github.com/ismailceylan/mark-3/commit/6d40850dcb174d32232e70e9139fe71f43a05d96))
* **helpers:** add new number/reduce helper ([1881c99](https://github.com/ismailceylan/mark-3/commit/1881c992547a42eb6b23aa60298d5abfc2ef0c56))


### Bug Fixes

* **components:** add a watch getter to watch some ref elements in virtual-scroll component ([a74b0b7](https://github.com/ismailceylan/mark-3/commit/a74b0b7061a3fef9da8acc1177dda03f54edd9ae))
* **components:** add the immediate flag to process the already full item store immediately in virtual-scroll component ([a45a4da](https://github.com/ismailceylan/mark-3/commit/a45a4da63c3921714b0df8f86e33601956ad9a69))
* **components:** use a more secure value to ensure that the key value of the virtual scroll element is unique ([1db4081](https://github.com/ismailceylan/mark-3/commit/1db40812aadbbc186bcae6a7169a298060aa9ced))
* **components:** use the getter watch pattern to watch elements properly when they are sent as refs in virtual-scroll component ([6556ae8](https://github.com/ismailceylan/mark-3/commit/6556ae8abec1c2b5715fd914503d539bb1dd8e8a))
* **composables:** fix virtual-scroll artifact problems and add relative position to wrapper ([a7566c3](https://github.com/ismailceylan/mark-3/commit/a7566c352f0f83f8ab0df910d3e7d6517d0e5c3a))
* **composables:** virtual-scroll recalculate properly item heights when the screen size changed ([0749124](https://github.com/ismailceylan/mark-3/commit/07491247c28461c9cc65b49c98d992dfab07aeea))

### [0.0.8](https://github.com/ismailceylan/mark-3/compare/v0.0.7...v0.0.8) (2025-08-13)

### [0.0.7](https://github.com/ismailceylan/mark-3/compare/v0.0.6...v0.0.7) (2025-08-13)


### Features

* **components:** add new virtual-scroll component ([c73a31d](https://github.com/ismailceylan/mark-3/commit/c73a31d6dc2ec37d8e70a15160bda495425712ca))
* **composables:** add new use-css-metrics composable ([8500859](https://github.com/ismailceylan/mark-3/commit/85008595788348956cd2f40cc0fff65d038672b0))
* **composables:** add new use-resize-observer composable ([6d110b5](https://github.com/ismailceylan/mark-3/commit/6d110b5c17facd4918a8a02a49d2f7644ada8f96))
* **composables:** add new use-scroll-position composable ([f847cb0](https://github.com/ismailceylan/mark-3/commit/f847cb0a9f19f09f82ab55d447227a7aa21516d5))
* **helpers:** add new time/throttle method ([60b8472](https://github.com/ismailceylan/mark-3/commit/60b8472fdb56119888c90446fe237b1fc9573f2b))

### [0.0.6](https://github.com/ismailceylan/mark-3/compare/v0.0.5...v0.0.6) (2025-08-09)


### Features

* **composables:** add new use-outside-clicks composable ([6657b90](https://github.com/ismailceylan/mark-3/commit/6657b90c8330888d7f5d23b20cd85519bd44530b))
* **composables:** add new use-pointer-swipe composable ([c048b5c](https://github.com/ismailceylan/mark-3/commit/c048b5ce2aafe1f8d8a79aa7b1b37398a8e195e2))
* **composables:** add new use-swipeable-drawer composable ([f9e7c7a](https://github.com/ismailceylan/mark-3/commit/f9e7c7a0f757b04d63fef2ce078ed89d5e044dd8))
* **helpers:** add new string/encode-superscript method ([655fb59](https://github.com/ismailceylan/mark-3/commit/655fb59692486202e04da2f742c5ce0d432e3b71))

### [0.0.5](https://github.com/ismailceylan/mark-3/compare/v0.0.4...v0.0.5) (2025-08-03)


### Features

* **component:** add new scroll-aware-content component ([5cb2645](https://github.com/ismailceylan/mark-3/commit/5cb2645a7f2ed778adc5f30a6e684b89b4ac360a))
* **composables:** add new use-intersection-observer composable ([5d71054](https://github.com/ismailceylan/mark-3/commit/5d710544a3067f29c8b5c4ce1db66c1ab3549a06))
* **composables:** add new use-scroll-event composable ([00e87cc](https://github.com/ismailceylan/mark-3/commit/00e87cc5bab981f53c4c61a7f3858ad4d0c45a9c))
* **helpers:** add new array/pick-random method ([1679cfa](https://github.com/ismailceylan/mark-3/commit/1679cfa821219fe85aef19afc17ed1b831d08ffd))
* **helpers:** add new number/clamp method ([3694de5](https://github.com/ismailceylan/mark-3/commit/3694de551c05ad8cab78e139f35225f92d7e50b1))
* **helpers:** add new number/random method ([bf718b3](https://github.com/ismailceylan/mark-3/commit/bf718b3ffca5147fb7985bde8d5c22e2763b3bfc))
* **helpers:** add new string/encode-subscript method ([3dce61a](https://github.com/ismailceylan/mark-3/commit/3dce61a8c9d927126ddb94118a33d0663bba5269))
* **helpers:** add new time/debounce helper method ([e9c4232](https://github.com/ismailceylan/mark-3/commit/e9c423233f7b946715f8624432af40f96aba9e90))
* **helpers:** add new types/is-numeric helper method ([ab84773](https://github.com/ismailceylan/mark-3/commit/ab847736ae695fce62e42155c3653a216f6e321b))

### [0.0.4](https://github.com/ismailceylan/mark-3/compare/v0.0.3...v0.0.4) (2025-08-02)


### Features

* **composables:** add new use-responsiveness composable ([3b6ebe4](https://github.com/ismailceylan/mark-3/commit/3b6ebe4f0c50668453071cf4146b3dc459a25f24))
* **helpers:** add new types/is-map method ([fdcda02](https://github.com/ismailceylan/mark-3/commit/fdcda0239aab54951df1c708dee7e74989801c79))
* **helpers:** add new types/is-set method ([618abbe](https://github.com/ismailceylan/mark-3/commit/618abbeb6f068774dfa4c6158302fd7ac5f7fccc))


### Bug Fixes

* **helpers:** ensures that the default argument value is used for chars on string/trim method ([645f41e](https://github.com/ismailceylan/mark-3/commit/645f41e883b8777a16e4773ed520411e9953a45b))

### [0.0.3](https://github.com/ismailceylan/mark-3/compare/v0.0.2...v0.0.3) (2025-08-02)


### Features

* **composables:** add new use-event-listener composable ([58bee94](https://github.com/ismailceylan/mark-3/commit/58bee94286d6736fee813f2286a3bd33031d58b2))
* **composables:** add new use-media-query composable ([b76da8a](https://github.com/ismailceylan/mark-3/commit/b76da8a083e13e60c967c90f8116aaa3c735c74f))
* **helpers:** add new escape-regex helper ([78ba818](https://github.com/ismailceylan/mark-3/commit/78ba818542c8325809d72ec7920f2aa14cd053d0))
* **helpers:** add new get-type-name helper ([12cc26c](https://github.com/ismailceylan/mark-3/commit/12cc26c83335f96af408d90b5accab3aaa5f6d32))
* **helpers:** add new is-array helper ([b8b95f6](https://github.com/ismailceylan/mark-3/commit/b8b95f652677f6dc6079b34cd97bcb64671db75c))
* **helpers:** add new string/camel-to-dash helper ([fbbbcf0](https://github.com/ismailceylan/mark-3/commit/fbbbcf0570b38ccabbd44044ca9054d3dccdaafd))
* **helpers:** add new string/trim helper ([cfd40a3](https://github.com/ismailceylan/mark-3/commit/cfd40a3a4741bb0ffe8bcc184f623cb6c6f39c6c))
* **helpers:** add new types/is-empty helper ([151a547](https://github.com/ismailceylan/mark-3/commit/151a547d2ab89e47b5d9f85bad080af82d4e02a4))
* **helpers:** add new types/is-plain-object method ([98a7804](https://github.com/ismailceylan/mark-3/commit/98a780415f4d1b086075be042b8467509fb2815d))
* **helpers:** add new types/is-string helper ([2ee5197](https://github.com/ismailceylan/mark-3/commit/2ee51979235a674d63a3d8c9381f37ccc84ecfd7))

### [0.0.2](https://github.com/ismailceylan/mark-3/compare/v0.0.1...v0.0.2) (2025-08-01)


### Features

* **helpers:** add new date/format helper ([9d2eb12](https://github.com/ismailceylan/mark-3/commit/9d2eb12c8595785d0b40ec740612ecdc407e4fe2))
* **helpers:** add new date/from-timestamp helper ([812163f](https://github.com/ismailceylan/mark-3/commit/812163f84a11e53f77b7f291ccad8f1b3bd88631))
* **helpers:** add new date/is-on-same-day helper ([8fe86fc](https://github.com/ismailceylan/mark-3/commit/8fe86fcff57d51803307f12f7e78310999f0acb2))
* **helpers:** add new date/is-on-same-year helper ([f29123a](https://github.com/ismailceylan/mark-3/commit/f29123a2997e294c2672bb450124e0b571b6d730))

### 0.0.1 (2025-08-01)
