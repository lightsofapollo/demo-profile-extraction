default: build

node_modules:
	npm install

b2g:
	# download a b2g-bin if one does not exist.
	./node_modules/marionette-host-environment/bin/marionette-host-environment b2g

build: node_modules b2g
	node index.js
