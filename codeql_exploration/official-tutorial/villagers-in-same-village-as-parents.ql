import tutorial

from Person person, Person parent
where
  parent = parentOf(person) and
  person.getLocation() != parent.getLocation() and
  not person.isDeceased() and
  not parent.isDeceased()
select person, person.getLocation(), parent, parent.getLocation()
