package main

import (
	"strings"
)

func interpret(command string) string {
	r := strings.ReplaceAll(command, "()", "o")
	r = strings.ReplaceAll(r, "(", "")
	r = strings.ReplaceAll(r, ")", "")
	return r
}
