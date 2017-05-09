
/*
  Copyright (c) 2017 Bent Cardan

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"),
  to deal in the Software without restriction, including without limitation
  the rights to use, copy, modify, merge, publish, distribute, sublicense,
  and/or sell copies of the Software, and to permit persons to whom
  the Software is furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included
  in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
  THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
  IN THE SOFTWARE.
*/

module.exports = pullrecvfrom

function pullrecvfrom () {
  const r = Array
    .from(arguments)
    .reduce(parseargs, {})

  let bufs = [], receiver

  if (r.sz)
    r.recvfrom(r.addr, r.sz, recv)
  else
    r.recvfrom(r.addr, recv)

  function recv(buf) {
    return receiver ? receiver(null, buf) : bufs.push(buf)
  }

  function read(abort, cb) {
    receiver = null
    return bufs.length ? cb(null, bufs.shift()) : receiver = cb
  }

  return read
}

function parseargs (r, v) {
  switch (typeof v) {
    case 'string': r.addr = v; break
    case 'number': r.sz = v; break
    case 'function': r.recvfrom = v
  }
  return r
}
