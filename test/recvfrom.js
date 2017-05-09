
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

const recvfrom = require('recvfrom')
const sendto = require('sendto')
const pull = require('pull-stream')
const pullfrom = require('..')
const isBuffer = Buffer.isBuffer

const addr = '/tmp/asdf'

module.exports = function handle (t) {
  t.test('recvfrom', buffers)
}

function buffers (t) {
  t.plan(2)

  var msg = Buffer('hello from sendto!')

  pull(
    pullfrom('/tmp/source', recvfrom), // <-- pass address and recvfrom to source()
    pull.drain(function(buf){
      t.ok( isBuffer(buf),   'recv a buf' )
      t.is( buf+'',  msg+'', `buffer recv'd from sendto is msg: ${msg}`)
      setImmediate(process.exit, 0)
    })
  )

  sendto('/tmp/source', msg)
}
