.PHONY: start stop

PORT ?= 8013
HOST ?= localhost
PYTHON := $(shell which python3 2>/dev/null || which python)

server:
	@echo "Starting Halloween 25 server on http://$(HOST):$(PORT)"
	@echo "Press Ctrl+C to stop the server"
	@$(PYTHON) -m http.server $(PORT) --bind $(HOST)

stop:
	@echo "Stopping server..."
	@pkill -f "python.*http.server.*$(PORT)" || echo "No server running on port $(PORT)"
