import tutorial

predicate isMonarch(Person p) { p = "Clara" }

// Recursively compute degree of relation.
// Direct descendants will have positive values.
// Descendants of relatives will have positive values as well.
predicate relationDegree(Person p, int degree) {
  isMonarch(p) and degree = 0
  or
  exists(Person parent, int parentDegree |
    parentOf(p) = parent and relationDegree(parent, parentDegree) and degree = parentDegree + 1
  )
  or
  exists(Person child, int childDegree |
    parentOf(child) = p and relationDegree(child, childDegree) and degree = childDegree - 1
  )
}

Person ancestorOf(Person p) {
  result = parentOf(p) or
  result = parentOf(ancestorOf(p))
}

Person descendantOf(Person p) {
  p = parentOf(result) or
  p = parentOf(descendantOf(result))
}

boolean isDirectLine(Person p) {
  if
    exists(Person x |
      (p = ancestorOf(x) or p = descendantOf(x)) and
      isMonarch(x)
    )
  then result = true
  else result = false
}

from Person p, int degree
where relationDegree(p, degree) and not p.isDeceased()
select p, degree, isDirectLine(p)
