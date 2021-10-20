.PHONY: clean create_scan create_pull create_branch delete_scan delete_pull delete_branch go_app_accuracy

build_all: clean create_scan create_pull create_branch rebuild_accuracy build_accuracy go_app_accuracy

clean:
	rm -rf dist
	rm -rf go-app-accuracy/bin

build_accuracy:
	node_modules/.bin/webpack-cli --env NODE_ENV=$(STAGE) handler=build-accuracy.js
	zip dist/build-accuracy.zip dist/build-accuracy.*
