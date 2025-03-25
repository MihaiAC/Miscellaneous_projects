import tutorial

class Region extends string {
  Region() { exists(Person p | p.getLocation() = this) }
}

predicate population(Region r, int popCount) {
  count(Person p | p.getLocation() = r | p) = popCount
}

from Region r, int popCount
where population(r, popCount)
select r, popCount
