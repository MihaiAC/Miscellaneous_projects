import tutorial

Person childOf(Person p) { p = parentOf(result) }

int maxChildren() { result = max(Person p | | count(childOf(p))) }

int numberOfChildren(Person p) { result = count(childOf(p)) }

from Person p, int maxC
where
  maxC = maxChildren() and
  numberOfChildren(p) = maxC
select p, maxC
