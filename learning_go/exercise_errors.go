// Taken from https://go.dev/tour/methods/20.
package main

import (
	"fmt"
)

type ErrNegativeSqrt float64

func (e ErrNegativeSqrt) Error() string {
	return "Cannot sqrt negative number: " + fmt.Sprint(float64(e))
}

func Sqrt(x float64) (float64, error) {
	if x < 0 {
		return 0, ErrNegativeSqrt(x)
	} else {
		z := 1.0
		for i := 0; i < 50; i++ {
			z -= (z*z-x) / (2*z)
		}
		return z, nil
	}
}

func main() {
	fmt.Println(Sqrt(2))
	fmt.Println(Sqrt(-2))
}
