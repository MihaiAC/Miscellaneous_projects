import tutorial

Person ancestorOf(Person p) {
  result = parentOf(p) or
  result = parentOf(ancestorOf(p))
}

from Person p
where p = ancestorOf(p)
select p
