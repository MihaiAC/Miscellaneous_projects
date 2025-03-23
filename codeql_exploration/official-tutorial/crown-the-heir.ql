import tutorial

// Select all parent-child pairs.
// from Person p
// select parentOf(p) + " is a parent of " + p
// Selects all the King's siblings.
// from Person p
// where
//   parentOf(p) = parentOf("King Basil") and
//   not p = "King Basil" and
//   not p.isDeceased()
// select p
// Get all p's children - using the "return value" as an argument!
// from Person p
// where
//   parentOf(p) = parentOf("King Basil") and
//   not p = "King Basil"
// select childOf(p)
Person childOf(Person p) { p = parentOf(result) }

Person ancestorOf(Person p) {
  result = parentOf(p) or
  result = parentOf(ancestorOf(p))
}

Person relativeOf(Person p) { parentOf*(result) = parentOf*(p) }

predicate hasCriminalRecord(Person p) {
  p = "Hester" or
  p = "Hugh" or
  p = "Charlie"
}

from Person p
where
  p = relativeOf("King Basil") and
  not p.isDeceased() and
  not hasCriminalRecord(p)
select p
