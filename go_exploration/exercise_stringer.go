// Taken from https://go.dev/tour/methods/18.
package main

import (
	"fmt"
	"strings"
	"strconv"
)

type IPAddr [4]byte

// TODO: Add a "String() string" method to IPAddr.
func (ip_addr IPAddr) String() string {
	str_ip_addr := make([]string, 4)
	for idx := range ip_addr {
		str_ip_addr[idx] = strconv.Itoa(int(ip_addr[idx]))
	}
	return strings.Join(str_ip_addr, ".")
}


func main() {
	hosts := map[string]IPAddr{
		"loopback":  {127, 0, 0, 1},
		"googleDNS": {8, 8, 8, 8},
	}
	for name, ip := range hosts {
		fmt.Printf("%v: %v\n", name, ip)
	}
}
