import tutorial

from Person t
where
  t.getHeight() > 150 and
  t.getHairColor() != "blond" and
  exists(string c | t.getHairColor() = c) and
  t.getAge() >= 30 and
  t.getLocation() = "east" and
  (t.getHairColor() = "black" or t.getHairColor() = "brown") and
  (t.getHeight() <= 180 or t.getHeight() >= 190) and
  exists(Person p | p.getAge() > t.getAge()) and
  exists(Person p | p.getHeight() > t.getHeight()) and
  t.getHeight() < avg(Person p | | p.getHeight()) and
  t = max(Person p | p.getLocation() = "east" | p order by p.getAge())
select t
