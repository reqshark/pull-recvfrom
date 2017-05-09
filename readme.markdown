# pull-recvfrom

a [`pull-stream`](https://github.com/pull-stream/pull-stream) for [`recvfrom`](https://github.com/reqshark/recvfrom)

this module provides a source stream interface to recvfrom

```bash
npm i pull-recvfrom
```

### pullfrom(*string*, *number*, *recvfrom*)

parameter signature, `pullfrom(str, n, fn)`:

* `string`, a unix datagram socket path

* `number`, buffer recv size

* `recvfrom`, a reference to [`recvfrom`](https://github.com/reqshark/recvfrom)

for example:

```js
const pullfrom = require('pull-recvfrom')
const recvfrom = require('recvfrom')

const sockpath = `/tmp/mysocketpath`
const sz = 99999

const pull = require('pull-stream')

pull(
  pullfrom(sockpath, sz, recvfrom), // pass address and recvfrom to pullfrom()
  pull.drain(console.log)
)
```

the buffer limit configuration `sz` is an optional parameter

you can pass a reference to `recvfrom`, after the unix socket path:

```js
pullfrom('/tmp/mysocketpath', require('recvfrom'))
```

### MIT
