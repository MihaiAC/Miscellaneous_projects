package main

import (
	"fmt"
	"container/heap"
	"math"
)

type Point2D struct {
	x float64
	y float64
}

func (point Point2D) dist_from_origin() float64 {
	return math.Pow(point.x, 2) + math.Pow(point.y, 2)
}

type Point2DHeap []Point2D

func (h Point2DHeap) Len() int {
	return len(h)
}

func (h Point2DHeap) Less(i, j int) bool {
	return h[i].dist_from_origin() < h[j].dist_from_origin()
}

func (h Point2DHeap) Swap(i, j int) {
	h[i], h[j] = h[j], h[i]
}

func (h *Point2DHeap) Push(x any) {
	*h = append(*h, x.(Point2D))
}

func (h *Point2DHeap) Pop() any {
	old := *h
	n := len(old)
	x := old[n-1]
	*h = old[0:(n-1)]
	return x
}

func main() {
	h := new(Point2DHeap)
	p1 := Point2D{2, 3}
	p2 := Point2D{0, 1}
	p3 := Point2D{10, 0}

	heap.Init(h)
	heap.Push(h, p1)
	heap.Push(h, p2)
	heap.Push(h, p3)

	for h.Len() > 0 {
		fmt.Println(heap.Pop(h))
	}
}