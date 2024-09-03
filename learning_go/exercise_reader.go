// Taken from https://go.dev/tour/methods/22.

package main

import "golang.org/x/tour/reader"

type MyReader struct{}

func (MyReader) Read(b []byte) (int, error) {
	for idx :=  range b {
		b[idx] = 'A'
	}
	return len(b), nil
}

func main() {
	reader.Validate(MyReader{})
}
