import tutorial

predicate isSouthern(Person p) { p.getLocation() = "south" }

predicate isBald(Person p) { not exists(string c | p.getHairColor() = c) }

class Southerner extends Person {
  Southerner() { isSouthern(this) }
}

// Overriding a predicate for the member of a class.
// Children are not allowed outside their region.
class Child extends Person {
  Child() { this.getAge() < 10 }

  // A member predicate.
  override predicate isAllowedIn(string region) { region = this.getLocation() }
}

// Suspects.
from Southerner s
where
  s.isAllowedIn("north") and
  isBald(s)
select s, s.getAge()
