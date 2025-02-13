// Taken from https://go.dev/tour/methods/23.

package main

import (
	"io"
	"os"
	"strings"
)

type rot13Reader struct {
	r io.Reader
}

func rot13(x byte) byte {
	if (x >= 'a' && x <= 'z') || (x >= 'A' && x <= 'Z') {
		is_capital := (x >= 'A') && (x <= 'Z')
		x += 13
		if (is_capital && x > 'Z') || (!is_capital && x > 'z') {
			x -= 26
		}
	}
	return x
}

func (r13_reader *rot13Reader) Read(b []byte) (int, error) {
	n, err := r13_reader.r.Read(b)
	if err != nil {
		return 0, err
	}

	for i := 0; i <= n; i++ {
		b[i] = rot13(b[i])
	}

	return n, nil
}

func main() {
	s := strings.NewReader("Lbh penpxrq gur pbqr!")
	r := rot13Reader{s}
	io.Copy(os.Stdout, &r)
}