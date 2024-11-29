package main

import "fmt"

func maximum69Number(num int) int {
	m := map[rune]int{'6': 6, '9': 9}
	s := fmt.Sprint(num)
	n := 0
	b := false

	for _, c := range s {
		n = n * 10

		if b == false && c == '6' {
			b = true
			n = n + 9
		} else {
			n = n + m[c]
		}
	}

	return n
}
