# Profile extraction demo-

Initial boilerplate that can be used to extract some IDB data
from apps... This is using minimal magic outside of the "host"
which sets up the basics for marionette to run.

## Usage:

```sh
make
```

You should see something like:

"tmp path to magic idb files: X"

## How it works

TLDR;

index.js - boilerplate
lib/extract.js - does calendar launch, close and finds idb dir.

More:

npm is used to download deps and then the marionette host
environment package will download a b2g binary (put yours in b2g if
you don't want it to setup for you).

Then an open port is opened for marionette and the client will
connect to a running b2g desktop instance. Once the client is
connected the calendar app is launched and then closed (you need to
place your logic there see extract.js).
