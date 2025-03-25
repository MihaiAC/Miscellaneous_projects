import tutorial

Person childOf(Person p) { p = parentOf(result) }

Person descendantOf(Person p) { p = parentOf(result) or p = descendantOf(parentOf(result)) }

int maxDescendants() { result = max(Person p | | count(descendantOf(p))) }

int numberOfDescendants(Person p) { result = count(descendantOf(p)) }

from Person p, int maxC
where
  maxC = maxDescendants() and
  numberOfDescendants(p) = maxC
select p, maxC
