package main

import (
	"fmt"
	"sync"
)

type Fetcher interface {
	// Fetch returns the body of URL and
	// a slice of URLs found on that page.
	Fetch(url string) (body string, urls []string, err error)
}

type SafeCache struct {
	mu sync.Mutex
	visited map[string]bool
}

var cache SafeCache = SafeCache{visited: make(map[string]bool)}
var url_chan chan string = make(chan string)
var err_chan chan error = make(chan error)
var wg sync.WaitGroup

func Crawl(url string, depth int, fetcher Fetcher) {
	if depth <= 0 {
		wg.Done()
		return
	}
	
	cache.mu.Lock()
	
	_, ok := cache.visited[url]
	if ok {
		cache.mu.Unlock()
		wg.Done()
		return
	} else {
		cache.visited[url] = true
		cache.mu.Unlock()
	}
	
	_, urls, err := fetcher.Fetch(url)
	if err != nil {
		err_chan <- err
		wg.Done()
		return
	}
	
	url_chan <- url
	
	for _, u := range urls {
		wg.Add(1)
		go Crawl(u, depth-1, fetcher)
	}
	
	wg.Done()
	return
}

func main() {
	wg.Add(1)
	go Crawl("https://golang.org/", 4, fetcher)
	
	go func() {
		for {
			url, ok := <-url_chan
			fmt.Println(url)
			if !ok {
				return
			}
		}
	}()
	
	go func() {
		for {
			err, ok := <-err_chan
			fmt.Println(err)
			if !ok {
				return
			}
		}
	}()
	
	wg.Wait()
	close(url_chan)
	close(err_chan)
}


// fakeFetcher is Fetcher that returns canned results.
type fakeFetcher map[string]*fakeResult

type fakeResult struct {
	body string
	urls []string
}

func (f fakeFetcher) Fetch(url string) (string, []string, error) {
	if res, ok := f[url]; ok {
		return res.body, res.urls, nil
	}
	return "", nil, fmt.Errorf("not found: %s", url)
}

// fetcher is a populated fakeFetcher.
var fetcher = fakeFetcher{
	"https://golang.org/": &fakeResult{
		"The Go Programming Language",
		[]string{
			"https://golang.org/pkg/",
			"https://golang.org/cmd/",
		},
	},
	"https://golang.org/pkg/": &fakeResult{
		"Packages",
		[]string{
			"https://golang.org/",
			"https://golang.org/cmd/",
			"https://golang.org/pkg/fmt/",
			"https://golang.org/pkg/os/",
		},
	},
	"https://golang.org/pkg/fmt/": &fakeResult{
		"Package fmt",
		[]string{
			"https://golang.org/",
			"https://golang.org/pkg/",
		},
	},
	"https://golang.org/pkg/os/": &fakeResult{
		"Package os",
		[]string{
			"https://golang.org/",
			"https://golang.org/pkg/",
		},
	},
}